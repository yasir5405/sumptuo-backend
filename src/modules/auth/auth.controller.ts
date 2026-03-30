import { Request, Response } from "express";
import { registerUserSchema } from "./auth.validation";
import { ApiResponse } from "../../schema/general.schema";
import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";

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

    await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        name,
      },
    });

    const response: ApiResponse<null> = {
      data: null,
      message: "Account successfully created",
      success: true,
    };

    return res.status(201).json(response);
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
