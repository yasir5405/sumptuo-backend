import { Router } from "express";
import { googleLogin } from "./google.controller";

const googleRouter = Router();

googleRouter.get("/", googleLogin);

export { googleRouter };
