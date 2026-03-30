import express from "express";
import "dotenv/config";
import { authRouter } from "./modules/auth/auth.route";

const app = express();
app.use(express.json());
const PORT = process.env.PORT ?? 5000;

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Sumptuo",
  });
});

app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log(`The server is running at: http://localhost:${PORT}`);
});
