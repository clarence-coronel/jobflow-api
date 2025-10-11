import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { logger } from "./lib";
import { PORT } from "./config";
import mainRouter from "./routes/index.ts";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api", mainRouter);

app.get("/", (req, res) => {
  logger.error("Something went wrong");
  logger.warn("This might cause issues");
  logger.info("Server started on port 3000");
  logger.http("GET /api/users 200");
  logger.verbose("Detailed operation info");
  logger.debug("User object:", "sample");
  logger.silly("Lowest level log");

  res.send("Hello, Express + TypeScript!");
});

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});
