import express from "express";
import "dotenv/config";
import { authRouter } from "./modules/auth/auth.route";
import cors from "cors";
import cookieParser from "cookie-parser";
import { metaRouter } from "./modules/meta/meta.route";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(cookieParser());
const PORT = process.env.PORT ?? 5000;

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Sumptuo",
  });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/meta", metaRouter);

app.listen(PORT, () => {
  console.log(`The server is running at: http://localhost:${PORT}`);
});
