import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/connection.js";
import ConnectionRouter from "./routes/connection.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:8001",
      "http://localhost:8000",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
dotenv.config();
const PORT = process.env.PORT || 8002;

app.use("/", ConnectionRouter);

app.listen(PORT, async () => {
  console.log("Connection Server connected on port", PORT);
  await connectDb();
});
