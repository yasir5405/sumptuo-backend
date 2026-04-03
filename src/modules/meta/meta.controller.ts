import { Request, Response } from "express";
import { ApiResponse } from "../../schema/general.schema";
import axios from "axios";

export const connectMeta = async (req: Request, res: Response) => {
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

  const url =
    `https://www.facebook.com/v21.0/dialog/oauth` +
    `?client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
    `&scope=public_profile` +
    `&response_type=code`;

  return res.redirect(url);
};

export const metaCallback = async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;

    if (!code) {
      const response: ApiResponse<null> = {
        data: null,
        message: "No code provided",
        success: false,
        error: {
          message: "No code provided",
        },
      };

      return res.status(400).json(response);
    }

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

    const accessToken = tokenRes.data.access_token;

    const userRes = await axios.get(`https://graph.facebook.com/me`, {
      params: {
        access_token: accessToken,
        fields: "id,name,email,picture.width(200).height(200)",
      },
    });

    const response: ApiResponse<typeof userRes.data> = {
      success: true,
      data: userRes.data,
      message: "Data fetched",
    };

    return res.status(200).json(response);
  } catch (error) {
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
