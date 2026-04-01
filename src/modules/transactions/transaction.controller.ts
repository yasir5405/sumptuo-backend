import { NextFunction, Request, Response } from "express";
import { addTransactionSchema } from "./transaction.validation";
import { ApiResponse } from "../../schema/general.schema";
import { prisma } from "../../lib/prisma";
import { Prisma } from "../../generated/prisma/client";

export const addTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const parsedBody = addTransactionSchema.safeParse(req.body);

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

  const {
    amount,
    category,
    date,
    type,
    convertedAmount,
    currency,
    description,
    importId,
  } = parsedBody.data;

  try {
    const user = req.user!;

    const transaction = await prisma.transaction.create({
      data: {
        amount: new Prisma.Decimal(amount),
        category,
        date,
        type,
        convertedAmount: convertedAmount
          ? new Prisma.Decimal(convertedAmount)
          : undefined,
        currency: currency ?? user.currency,
        description,
        importId,
        userId: user.id,
      },
    });

    if (!transaction) {
      const response: ApiResponse<null> = {
        data: null,
        message: "Error adding transaction",
        success: false,
        error: {
          message: "Error adding transaction",
        },
      };
      return res.status(500).json(response);
    }

    const response: ApiResponse<null> = {
      data: null,
      message: "Transaction created successfully",
      success: true,
    };
    res.status(201).json(response);
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
