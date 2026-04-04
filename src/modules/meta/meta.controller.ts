import { Request, Response } from "express";
import { ApiResponse } from "../../schema/general.schema";
import axios from "axios";
import { prisma } from "../../lib/prisma";
import { verifyToken } from "../../lib/jwt";

export const metaConnect = async (req: Request, res: Response) => {
  const clientId = process.env.META_APP_ID;
  const redirectUrl = process.env.META_REDIRECT_URI;

  if (!clientId || !redirectUrl) {
    const response: ApiResponse<null> = {
      data: null,
      message: "Meta env variables not set",
      success: false,
      error: {
        message: "Meta env variables not set",
      },
    };
    return res.status(500).json(response);
  }

  const token = req.query.token as string;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token missing",
      data: null,
    });
  }

  const { userId } = verifyToken(token);

  const url =
    `https://www.facebook.com/v21.0/dialog/oauth` +
    `?client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
    `&scope=public_profile` +
    `&response_type=code` +
    `&state=${userId}`;

  return res.redirect(url);
};

export const metaCallback = async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;
    const userId = req.query.state as string;

    if (!code || !userId) {
      const response: ApiResponse<null> = {
        data: null,
        success: false,
        message: "Missing code or state",
        error: { message: "Missing code or state" },
      };

      return res.status(400).json(response);
    }

    // this is the short lived token recieved from meta
    const tokenRes = await axios.get(
      `https://graph.facebook.com/v21.0/oauth/access_token`,
      {
        params: {
          client_id: process.env.META_APP_ID,
          client_secret: process.env.META_APP_SECRET,
          redirect_uri: process.env.META_REDIRECT_URI,
          code,
        },
      },
    );

    //the short token
    const shortToken = tokenRes.data.access_token;

    //fetching the long lived token from meta by exchanging the short lived token fetched earlier
    const longTokenRes = await axios.get(
      `https://graph.facebook.com/v21.0/oauth/access_token`,
      {
        params: {
          grant_type: "fb_exchange_token",
          client_id: process.env.META_APP_ID,
          client_secret: process.env.META_APP_SECRET,
          fb_exchange_token: shortToken,
        },
      },
    );

    //the Long lived token
    const longLivedToken = longTokenRes.data.access_token;
    const expiredIn = longTokenRes.data.expired_in;

    //fetching the ad accounts for the user
    const adAccountsRes = await axios.get(
      `https://graph.facebook.com/v21.0/me/adaccounts`,
      {
        params: {
          access_token: longLivedToken,
          fields: "id,name,account_status",
        },
      },
    );

    const adAccounts = adAccountsRes.data.data;

    if (!adAccounts || adAccounts.length === 0) {
      const response: ApiResponse<null> = {
        data: null,
        message: "No ad accounts found",
        success: false,
        error: {
          message: "No ad accounts found",
        },
      };

      return res.status(404).json(response);
    }

    //We take the first account of the user for now
    const account = adAccounts[0];

    await prisma.connectedAccount.upsert({
      where: {
        userId_platform_adAccountId: {
          userId: Number(userId),
          adAccountId: account.id,
          platform: "META",
        },
      },
      update: {
        accessToken: longLivedToken,
        expiresAt: new Date(Date.now() + expiredIn * 1000),
        adAccountName: account.name,
      },
      create: {
        userId: Number(userId),
        platform: "META",
        accessToken: longLivedToken,
        expiresAt: new Date(Date.now() + expiredIn * 1000),
        adAccountId: account.id,
        adAccountName: account.name,
      },
    });

    res.redirect(`${process.env.FRONTEND_URL}/dashboard?meta=connected`);
  } catch (error: any) {
    console.error("META CALLBACK ERROR:", error?.response?.data || error);
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
