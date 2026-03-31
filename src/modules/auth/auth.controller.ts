import { Request, Response } from "express";
import {
  forgotPasswordSchema,
  loginUserSchema,
  registerUserSchema,
  resetPasswordSchema,
} from "./auth.validation";
import { ApiResponse } from "../../schema/general.schema";
import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";
import { sendOtpEmail, sendWelcomeEmail } from "../../lib/email/email";
import { generateToken, verifyRefreshToken, verifyToken } from "../../lib/jwt";
import { generateOtp } from "../../lib/lib";

export const registerUser = async (req: Request, res: Response) => {
  const parsedBody = registerUserSchema.safeParse(req.body);

  if (!parsedBody.success) {
    const response: ApiResponse<null> = {
      data: null,
      message: "Invalid data format",
      success: false,
      error: {
        message: parsedBody.error.issues[0].message,
      },
    };

    return res.status(400).json(response);
  }

  const { email, name, password } = parsedBody.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        name,
      },
      select: {
        name: true,
        email: true,
      },
    });

    const response: ApiResponse<null> = {
      data: null,
      message: "Account successfully created",
      success: true,
    };

    res.status(201).json(response);

    await sendWelcomeEmail(user.email, user.name);
  } catch (error: any) {
    if (error.code === "P2002") {
      const response: ApiResponse<null> = {
        data: null,
        message: "Email already exists",
        success: false,
        error: {
          message: "Email already exists",
        },
      };

      return res.status(409).json(response);
    }

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

export const loginUser = async (req: Request, res: Response) => {
  const parsedBody = loginUserSchema.safeParse(req.body);

  if (!parsedBody.success) {
    const response: ApiResponse<null> = {
      data: null,
      message: "Invalid data format",
      success: false,
      error: {
        message: parsedBody.error.issues[0].message,
      },
    };

    return res.status(400).json(response);
  }

  const { email, password } = parsedBody.data;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        passwordHash: true,
        id: true,
      },
    });

    if (!user) {
      const response: ApiResponse<null> = {
        data: null,
        message: "Invalid credentials",
        success: false,
        error: {
          message: "Invalid credentials",
        },
      };

      return res.status(401).json(response);
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      const response: ApiResponse<null> = {
        data: null,
        message: "Invalid credentials",
        success: false,
        error: {
          message: "Invalid credentials",
        },
      };

      return res.status(401).json(response);
    }

    const { accessToken, refreshToken } = generateToken(user.id);

    await prisma.refreshToken.create({
      data: {
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        token: refreshToken,
        userId: user.id,
      },
    });

    const response: ApiResponse<{ accessToken: string }> = {
      data: {
        accessToken,
      },
      message: "Login successful",
      success: true,
    };

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
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

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken: token } = req.cookies;

  if (!token) {
    const response: ApiResponse<null> = {
      data: null,
      message: "Refresh token not found",
      success: false,
      error: {
        message: "Refresh token not found",
      },
    };

    return res.status(401).json(response);
  }

  try {
    const { userId } = verifyRefreshToken(token);

    if (!userId) {
      console.log("Refresh token missing userId");

      const response: ApiResponse<null> = {
        data: null,
        message: "Refresh token missing userId",
        success: false,
        error: {
          message: "Refresh token missing userId",
        },
      };

      return res.status(401).json(response);
    }

    const storedToken = await prisma.refreshToken.findFirst({
      where: {
        userId,
        token,
        revoked: false,
      },
    });

    if (
      !storedToken ||
      storedToken.revoked ||
      storedToken.expiresAt < new Date()
    ) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      const response: ApiResponse<null> = {
        data: null,
        message: "Invalid refresh token. Unauthorized",
        success: false,
        error: {
          message: "Invalid refresh token. Unauthorized",
        },
      };

      return res.status(401).json(response);
    }

    const { accessToken: newAccessToken } = generateToken(userId);

    const response: ApiResponse<{ accessToken: string }> = {
      data: {
        accessToken: newAccessToken,
      },
      message: "Access token generated successfully",
      success: true,
    };

    return res.status(201).json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      data: null,
      message: "Access token generation failed",
      success: false,
      error: { message: "Internal server error." },
    };
    return res.status(500).json(response);
  }
};

export const getUserDetails = async (req: Request, res: Response) => {
  const user = req.user;

  const response: ApiResponse<typeof user> = {
    data: user,
    message: "User data fetched successfully",
    success: true,
  };

  res.status(200).json(response);
};

export const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  if (refreshToken) {
    try {
      await prisma.refreshToken.updateMany({
        where: {
          token: refreshToken,
        },
        data: {
          revoked: true,
        },
      });
    } catch {}

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }
  const response: ApiResponse<null> = {
    data: null,
    message: "Logout successfull",
    success: true,
  };

  return res.status(200).json(response);
};

export const sendResetPasswordOtp = async (req: Request, res: Response) => {
  const parsedBody = forgotPasswordSchema.safeParse(req.body);

  if (!parsedBody.success) {
    const response: ApiResponse<null> = {
      data: null,
      message: "Invalid data format",
      success: false,
      error: {
        message: parsedBody.error.issues[0].message,
      },
    };

    return res.status(400).json(response);
  }

  const { email } = parsedBody.data;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      await prisma.resetPasswordToken.deleteMany({
        where: {
          userId: user.id,
        },
      });

      const otp = generateOtp();
      const hashedOtp = await bcrypt.hash(otp, 10);

      await prisma.resetPasswordToken.create({
        data: {
          expiresAt: new Date(Date.now() + 10 * 60 * 1000),
          token: hashedOtp,
          userId: user.id,
        },
      });

      try {
        await sendOtpEmail(user.email, otp);
      } catch {
        await prisma.resetPasswordToken.deleteMany({
          where: { userId: user.id },
        });
        throw new Error("Failed to send OTP email");
      }
    }

    const response: ApiResponse<null> = {
      data: null,
      message:
        "If an account with this email exists, you'll receive an OTP shortly.",
      success: true,
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

export const resetPassword = async (req: Request, res: Response) => {
  const parsedBody = resetPasswordSchema.safeParse(req.body);

  if (!parsedBody.success) {
    const response: ApiResponse<null> = {
      data: null,
      message: "Invalid data format",
      success: false,
      error: {
        message: parsedBody.error.issues[0].message,
      },
    };

    return res.status(400).json(response);
  }

  const { email, newPassword, otp } = parsedBody.data;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      const response: ApiResponse<null> = {
        data: null,
        message: "Invalid OTP or email",
        success: false,
        error: {
          message: "Invalid OTP or email",
        },
      };
      return res.status(400).json(response);
    }

    const token = await prisma.resetPasswordToken.findFirst({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!token) {
      const response: ApiResponse<null> = {
        data: null,
        message: "OTP expired or invalid",
        success: false,
        error: {
          message: "OTP expired or invalid",
        },
      };
      return res.status(400).json(response);
    }

    const isMatch = await bcrypt.compare(otp, token.token);

    if (!isMatch) {
      const response: ApiResponse<null> = {
        data: null,
        message: "OTP expired or invalid",
        success: false,
        error: {
          message: "OTP expired or invalid",
        },
      };
      return res.status(400).json(response);
    }

    if (token.expiresAt < new Date()) {
      const response: ApiResponse<null> = {
        data: null,
        message: "OTP expired or invalid",
        success: false,
        error: {
          message: "OTP expired or invalid",
        },
      };
      return res.status(400).json(response);
    }

    const updatedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.$transaction([
      prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          passwordHash: updatedPassword,
        },
      }),
      prisma.resetPasswordToken.deleteMany({
        where: {
          userId: user.id,
        },
      }),
      prisma.refreshToken.updateMany({
        where: {
          userId: user.id,
        },
        data: {
          revoked: true,
        },
      }),
    ]);

    const response: ApiResponse<null> = {
      data: null,
      message: "Password reset successful",
      success: true,
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
