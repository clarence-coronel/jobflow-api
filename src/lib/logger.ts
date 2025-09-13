import winston from "winston";
import { ENVIRONMENT } from "../config/index";

const { combine, timestamp, printf, colorize, json } = winston.format;

// Custom log format for console
const consoleFormat = combine(
  colorize(),
  timestamp(),
  printf(({ level, message, timestamp, ...meta }) => {
    return `[${timestamp}] ${level}: ${message} ${
      Object.keys(meta).length ? JSON.stringify(meta) : ""
    }`;
  })
);

export const logger = winston.createLogger({
  level: "info", // default logging level
  format: combine(timestamp(), json()), // default (for files)
  transports: [
    // File for errors
    new winston.transports.File({
      filename: "logs/errors.log",
      level: "error",
    }),

    // File for all logs
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

// In dev, also log to console with colors + readable format
if (ENVIRONMENT !== "production") {
  logger.add(
    new winston.transports.Console({
      format: consoleFormat,
    })
  );
}
