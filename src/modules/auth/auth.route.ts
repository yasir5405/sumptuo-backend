import { Router } from "express";
import { registerUser } from "./auth.controller";

const authRouter = Router();

authRouter.post("/signup", registerUser);

export { authRouter };
