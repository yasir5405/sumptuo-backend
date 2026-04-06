import { Request, Response } from "express";
import { ApiResponse } from "../../schema/general.schema";
import { googleAdsClient, oauth2Client } from "./google.service";
import axios from "axios";
import { prisma } from "../../lib/prisma";
import { generateToken } from "../../lib/jwt";
import { sendWelcomeEmail } from "../../lib/email/email";

export const googleLogin = async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;
    if (!code) {
      const response: ApiResponse<null> = {
        data: null,
        message: "Code required for Google Login",
        success: false,
        error: {
          message: "Code required for Google Login",
        },
      };

      return res.status(400).json(response);
    }

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
    );

    const userInfo = userRes.data;

    const { email, name, picture, id } = userInfo;

    if (!email) {
      const response: ApiResponse<null> = {
        data: null,
        message: "Google account has no email",
        success: false,
        error: {
          message: "Google account has no email",
        },
      };

      return res.status(400).json(response);
    }

    let user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { googleId: id }],
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: name || "Google user",
          googleId: id,
          passwordHash: "",
          profileImage: picture,
        },
      });

      await sendWelcomeEmail(user.email, user.name);
    } else {
      if (!user.googleId) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            googleId: id,
            profileImage: picture,
          },
        });
      }
    }

    const { accessToken, refreshToken } = generateToken(user.id);

    await prisma.$transaction([
      prisma.refreshToken.deleteMany({
        where: { userId: user.id },
      }),

      prisma.refreshToken.create({
        data: {
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          token: refreshToken,
          userId: user.id,
        },
      }),
    ]);

    const response: ApiResponse<{ accessToken: string }> = {
      data: {
        accessToken,
      },
      message: "Google login successful",
      success: true,
    };

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(response);
  } catch (error: any) {
    console.error("GOOGLE LOGIN ERROR:", error.response?.data || error.message);
    const response: ApiResponse<null> = {
      data: null,
      message: "Something went wrong",
      success: false,
      error: {
        message: "Internal server error",
      },
    };
    return res.status(500).json(response);
  }
};

export const fetchGoogleAdsAccounts = async (req: Request, res: Response) => {
  const { code } = req.query;
  const userId = req.user!.id;

  if (!code) {
    return res.status(400).json({
      data: null,
      message: "Authorization code missing",
      success: false,
    });
  }

  try {
    // 🔐 Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code as string);
    oauth2Client.setCredentials(tokens);

    const googleRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
    );

    const googleEmail: string = googleRes.data.email;

    const currentUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!currentUser?.googleId) {
      const response: ApiResponse<null> = {
        data: null,
        message:
          "Your account uses email/password login. Log out and sign in with Google to enable Google Ads connection.",
        success: false,
        error: {
          message:
            "Your account uses email/password login. Log out and sign in with Google to enable Google Ads connection.",
        },
      };

      return res.status(403).json(response);
    }

    if (googleEmail !== currentUser.email) {
      const response: ApiResponse<null> = {
        data: null,
        message: `You must connect Google Ads using the same Google account you signed in with (${currentUser.email}).`,
        success: false,
        error: {
          message: `You must connect Google Ads using the same Google account you signed in with (${currentUser.email}).`,
        },
      };

      return res.status(403).json(response);
    }

    const refreshToken = tokens.refresh_token;
    const accessToken = tokens.access_token;
    const expiryDate = tokens.expiry_date!;

    if (!refreshToken) {
      const response: ApiResponse<null> = {
        data: null,
        message: "No refresh token received. Please Re-authenticate",
        success: false,
        error: {
          message: "No refresh token received. Please Re-authenticate",
        },
      };
      return res.status(400).json(response);
    }

    // 🧠 STEP 1: Get accessible customers
    const listResponse =
      await googleAdsClient.listAccessibleCustomers(refreshToken);

    const customerIds = listResponse.resource_names.map((r) => r.split("/")[1]);

    const validAccounts: { id: string; name: string }[] = [];

    // 🧠 STEP 2: Process each account
    for (const customerId of customerIds) {
      try {
        const managerCustomer = googleAdsClient.Customer({
          customer_id: customerId,
          refresh_token: refreshToken,
          login_customer_id: customerId,
        });

        const clients = await managerCustomer.query(`
          SELECT
            customer_client.id,
            customer_client.descriptive_name,
            customer_client.manager
          FROM customer_client
        `);

        clients.forEach((row: any) => {
          const client = row.customer_client;
          if (!client || client.manager) return; // skip MCC itself

          validAccounts.push({
            id: client.id.toString(),
            name: client.descriptive_name || `Account ${client.id}`,
          });
        });
      } catch (err: any) {
        console.warn(`⚠️ Failed processing ${customerId}:`, err.message || err);
      }
    }

    // dedup just in case multiple MCCs share a client
    const uniqueAccounts = Array.from(
      new Map(validAccounts.map((acc) => [acc.id, acc])).values(),
    );

    const connectedAccounts = await prisma.connectedAccount.findMany({
      where: {
        userId,
        platform: "GOOGLE",
      },
      select: {
        adAccountId: true,
      },
    });

    const connectedIds = new Set(connectedAccounts.map((a) => a.adAccountId));

    const availableAccounts = uniqueAccounts.filter(
      (acc) => !connectedIds.has(acc.id),
    );

    if (availableAccounts.length === 0) {
      const response: ApiResponse<[]> = {
        data: [],
        message: "No valid Google Ads accounts found", // or "All accounts already connected"
        success: false,
        error: {
          message: "No valid Google Ads accounts found",
        },
      };
      return res.status(400).json(response);
    }

    const response: ApiResponse<{
      accounts: typeof availableAccounts;
      tokens: {
        accessToken: string;
        refreshToken: string;
        expiryDate: number;
      };
    }> = {
      data: {
        tokens: {
          accessToken: accessToken!,
          expiryDate,
          refreshToken: refreshToken!,
        },
        accounts: availableAccounts,
      },
      message: "Accounts fetched successfully",
      success: true,
    };

    res.status(200).json(response);
  } catch (error: any) {
    console.error("🔥 FETCH ACCOUNTS ERROR:", error);

    const response: ApiResponse<null> = {
      data: null,
      message:
        error?.errors?.[0]?.message ||
        error?.message ||
        "Internal server error",
      success: false,
      error: {
        message:
          error?.errors?.[0]?.message ||
          error?.message ||
          "Internal server error",
      },
    };

    return res.status(500).json(response);
  }
};

export const saveGoogleAdsAccounts = async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const { selectedAccounts, tokens } = req.body as {
    selectedAccounts: { id: string; name: string }[];
    tokens: {
      accessToken: string;
      refreshToken: string;
      expiryDate: number;
    };
  };

  if (!selectedAccounts?.length) {
    const response: ApiResponse<null> = {
      data: null,
      message: "No accounts selected",
      success: false,
      error: {
        message: "No accounts selected",
      },
    };

    return res.status(400).json(response);
  }

  if (!tokens?.accessToken || !tokens?.expiryDate || !tokens?.refreshToken) {
    const response: ApiResponse<null> = {
      data: null,
      message: "Missing tokens. Please reconnect your Google Ads account.",
      success: false,
    };

    return res.status(400).json(response);
  }

  try {
    const savedAccounts = [];

    for (const acc of selectedAccounts) {
      const saved = await prisma.connectedAccount.upsert({
        where: {
          userId_platform_adAccountId: {
            userId,
            platform: "GOOGLE",
            adAccountId: acc.id,
          },
        },
        update: {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          expiresAt: new Date(tokens.expiryDate),
          adAccountName: acc.name,
        },
        create: {
          userId,
          platform: "GOOGLE",
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          expiresAt: new Date(tokens.expiryDate),
          adAccountId: acc.id,
          adAccountName: acc.name,
        },
      });

      savedAccounts.push(saved);
    }

    const response: ApiResponse<typeof savedAccounts> = {
      data: savedAccounts,
      message: "Accounts connected successfully",
      success: true,
    };

    res.status(200).json(response);
  } catch (error: any) {
    console.error("🔥 SAVE ACCOUNTS ERROR:", error);
    const response: ApiResponse<null> = {
      data: null,
      message: error?.message || "Internal server error",
      success: false,
      error: {
        message: error?.message || "Internal server error",
      },
    };

    return res.status(500).json(response);
  }
};

export const getConnectedAccounts = async (req: Request, res: Response) => {
  const userId = req.user!.id;

  try {
    const accounts = await prisma.connectedAccount.findMany({
      where: { userId, platform: "GOOGLE" },
      select: {
        id: true,
        adAccountId: true,
        adAccountName: true,
        createdAt: true,
        platform: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const response: ApiResponse<typeof accounts> = {
      data: accounts,
      message: "Connected accounts connected successfully",
      success: true,
    };

    return res.status(200).json(response);
  } catch (error: any) {
    console.error("FETCHING CONNECTED ACCOUNTS ERROR:", error);
    const response: ApiResponse<null> = {
      data: null,
      message: error?.message || "Internal server error",
      success: false,
      error: {
        message: error?.message || "Internal server error",
      },
    };

    return res.status(500).json(response);
  }
};
