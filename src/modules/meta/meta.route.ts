import { Router } from "express";
import { metaCallback, metaConnect } from "./meta.controller";

const metaRouter = Router();

metaRouter.get("/connect", metaConnect);
metaRouter.get("/callback", metaCallback);

export { metaRouter };
