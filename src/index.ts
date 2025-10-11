import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { logger } from "./lib";
import { PORT } from "./config";
import mainRouter from "./routes/index.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", mainRouter);

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});
