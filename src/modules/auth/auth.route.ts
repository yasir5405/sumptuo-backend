import { Router } from "express";
import {
  getUserDetails,
  loginUser,
  logout,
  refreshToken,
  registerUser,
  resetPassword,
  sendResetPasswordOtp,
} from "./auth.controller";
import { verifyUser } from "../../middleware/auth.middleware";

const authRouter = Router();

authRouter.post("/signup", registerUser); //signup route
authRouter.post("/login", loginUser); //login route
authRouter.get("/me", verifyUser, getUserDetails); //login route
authRouter.get("/refresh-token", refreshToken); //refresh token route
authRouter.post("/logout", logout); //logout route
authRouter.post("/forgot-password", sendResetPasswordOtp); //send reset password otp route
authRouter.post("/reset-password", resetPassword); //send reset password otp route
export { authRouter };
