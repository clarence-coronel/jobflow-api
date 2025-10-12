import type { NextFunction, Response, Request } from "express";
import { adminAuth } from "../config";
import { prisma } from "../lib/prisma";
import { logger } from "../lib";
import { ErrorCodesEnum } from "../enums";
import { sendError } from "../utils";

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  // Check for Bearer token
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

  const token = authHeader.split(" ")[1];

  try {
    // Verify Firebase token
    const decodedToken = await adminAuth.verifyIdToken(token);

    // Find matching user in your database
    const user = await prisma.user.findUnique({
      where: { firebaseUid: decodedToken.uid },
      select: { id: true },
    });

    if (!user) {
      logger.warn("User not found in database", {
        firebaseUid: decodedToken.uid,
      });

      sendError({
        response: res,
        message: "User not found",
        statusCode: 401,
        code: ErrorCodesEnum.UNAUTHORIZED,
      });

      return;
    }

    // Attach both decoded token + internal user ID
    req.user = { ...decodedToken, id: user.id };

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
