import { Router } from "express";
import { connectMeta, metaCallback } from "./meta.controller";

const metaRouter = Router();

metaRouter.get("/connect", connectMeta);
metaRouter.get("/callback", metaCallback);

export { metaRouter };
