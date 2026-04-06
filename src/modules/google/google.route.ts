import { Router } from "express";
import {
  fetchGoogleAdsAccounts,
  getConnectedAccounts,
  googleLogin,
  saveGoogleAdsAccounts,
} from "./google.controller";
import { verifyUser } from "../../middleware/auth.middleware";

const googleRouter = Router();

googleRouter.get("/", googleLogin);
googleRouter.get("/accounts", verifyUser, fetchGoogleAdsAccounts);
googleRouter.post("/accounts/save", verifyUser, saveGoogleAdsAccounts);
googleRouter.get("/connected-accounts", verifyUser, getConnectedAccounts);

export { googleRouter };
