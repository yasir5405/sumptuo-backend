import { Router } from "express";
import {
  getUserDetails,
  loginUser,
  refreshToken,
  registerUser,
} from "./auth.controller";
import { verifyUser } from "../../middleware/auth.middleware";

const authRouter = Router();

authRouter.post("/signup", registerUser); //signup route
authRouter.post("/login", loginUser); //login route
authRouter.get("/me", verifyUser, getUserDetails); //login route
authRouter.get("/refresh-token", refreshToken); //refresh token route

export { authRouter };
