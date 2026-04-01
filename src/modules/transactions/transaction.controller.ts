import { Request, Response } from "express";
import { addTransactionSchema } from "./transaction.validation";
import { ApiResponse } from "../../schema/general.schema";
import { prisma } from "../../lib/prisma";
import { Prisma, Transaction } from "../../generated/prisma/client";

export const addTransaction = async (req: Request, res: Response) => {
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

export const getAllTransactions = async (req: Request, res: Response) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));
  const skip = (page - 1) * limit;

  try {
    const user = req.user!;

    const [transactions, count] = await prisma.$transaction([
      prisma.transaction.findMany({
        where: {
          userId: user.id,
        },
        skip,
        take: Number(limit),
        orderBy: {
          createdAt: "desc",
        },
        select: {
          amount: true,
          category: true,
          convertedAmount: true,
          currency: true,
          date: true,
          description: true,
          importId: true,
          type: true,
          id: true,
          createdAt: true,
        },
      }),

      prisma.transaction.count({ where: { userId: user.id } }),
    ]);

    const totalPages = Math.ceil(count / limit);

    const response: ApiResponse<{
      transactions: typeof transactions;
      count: number;
      page: number;
      limit: number;
      totalPages: number;
    }> = {
      data: {
        transactions,
        count,
        limit,
        page,
        totalPages,
      },
      message: "All transactions fetched",
      success: true,
    };

    res.status(200).json(response);
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
