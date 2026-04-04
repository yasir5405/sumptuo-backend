import { Request, Response } from "express";
import { ApiResponse } from "../../schema/general.schema";
import { oauth2Client } from "./google.service";
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
