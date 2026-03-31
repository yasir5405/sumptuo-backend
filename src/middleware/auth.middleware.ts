import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../schema/general.schema";
import { verifyToken } from "../lib/jwt";
import { prisma } from "../lib/prisma";

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader?.startsWith("Bearer ")) {
    const response: ApiResponse<null> = {
      data: null,
      message: "Unauthorized",
      success: false,
      error: { message: "Unauthorised", code: 401 },
    };

    return res.status(401).json(response);
  }

  const accessToken = authHeader.split(" ")[1];

  if (!accessToken) {
    const response: ApiResponse<null> = {
      data: null,
      message: "Unauthorized",
      success: false,
      error: { message: "Unauthorised", code: 401 },
    };
    return res.status(401).json(response);
  }

  try {
    const { userId } = verifyToken(accessToken);

    if (!userId) {
      const response: ApiResponse<null> = {
        data: null,
        message: "Unauthorized",
        success: false,
        error: { message: "Unauthorised", code: 401 },
      };
      return res.status(401).json(response);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      const response: ApiResponse<null> = {
        data: null,
        message: "Unauthorized",
        success: false,
        error: { message: "Unauthorised", code: 401 },
      };
      return res.status(401).json(response);
    }

    const { passwordHash: _, ...safeUser } = user;

    req.user = safeUser;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      // console.log("Token has expired");
      const response: ApiResponse<null> = {
        data: null,
        message: "Token expired",
        success: false,
        error: { message: "Unauthorised", code: 401 },
      };
      return res.status(401).json(response);
    } else {
      const response: ApiResponse<null> = {
        data: null,
        message: "Invalid token",
        success: false,
        error: { message: "Unauthorised", code: 401 },
      };
      // console.log("Token invalid for other reasons");
      return res.status(401).json(response);
    }
  }
};
