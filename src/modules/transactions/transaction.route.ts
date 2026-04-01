import { Router } from "express";
import { addTransaction, getAllTransactions } from "./transaction.controller";
import { verifyUser } from "../../middleware/auth.middleware";

const transactionRouter = Router();

transactionRouter.post("/", verifyUser, addTransaction);
transactionRouter.get("/", verifyUser, getAllTransactions);

export { transactionRouter };
