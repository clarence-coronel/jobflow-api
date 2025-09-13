import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { logger } from "./lib";
import { PORT } from "./config";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

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
