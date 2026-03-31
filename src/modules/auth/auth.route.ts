import { Router } from "express";
import { registerUser } from "./auth.controller";

const authRouter = Router();

authRouter.post("/signup", registerUser); //signup route

export { authRouter };
