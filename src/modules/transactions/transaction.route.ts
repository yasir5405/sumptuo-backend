import { Router } from "express";
import { addTransaction } from "./transaction.controller";
import { verifyUser } from "../../middleware/auth.middleware";

const transactionRouter = Router();

transactionRouter.post("/", verifyUser, addTransaction);

export { transactionRouter };
