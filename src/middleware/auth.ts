import type { NextFunction, Response, Request } from "express";

import { adminAuth } from "../config/index.js";
import { logger } from "../lib/";
import { ErrorCodesEnum } from "../enums";
import { sendError } from "../utils";

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  //    Check for Bearer token
  if (!authHeader?.startsWith("Bearer ") || !authHeader.split(" ")[1]) {
    logger.warn("No token provided");
    sendError({
      response: res,
      message: "Missing or invalid Authorization header",
      statusCode: 401,
      code: ErrorCodesEnum.UNAUTHORIZED,
    });
    return;
  }

  //   Already checked token exists
  const token = authHeader.split(" ")[1] as string;

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    req.user = decodedToken; // attach user info
    next();
  } catch (err) {
    logger.error("Token verification failed", { error: err });

    sendError({
      response: res,
      message: "Token verification failed",
      statusCode: 403,
      code: ErrorCodesEnum.FORBIDDEN,
    });
    return;
  }
}
