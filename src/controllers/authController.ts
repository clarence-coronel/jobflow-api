import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { adminAuth } from "../config/index.ts";
import { logger } from "../lib/";
import { ErrorCodesEnum } from "../enums";
import { sendError, sendSuccess } from "../utils";

export const googleAuth = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return sendError({
        response: res,
        message: "ID token is required",
        statusCode: 400,
        code: ErrorCodesEnum.BAD_REQUEST,
      });
    }
    // Verify Firebase Google Sign-In token
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    // Check if user signed in with Google
    if (decodedToken.firebase.sign_in_provider !== "google.com") {
      logger.warn("Non-Google sign-in attempt", {
        provider: decodedToken.firebase.sign_in_provider,
      });
      return sendError({
        response: res,
        message: "Only Google sign-in is supported",
        statusCode: 400,
        code: ErrorCodesEnum.BAD_REQUEST,
      });
    }
    // Find or create user in database
    let user = await prisma.user.findUnique({
      where: { firebaseUid: decodedToken.uid },
    });
    const isNewUser = !user;
    if (!user) {
      // Create new user + default tags
      user = await prisma.user.create({
        data: {
          firebaseUid: decodedToken.uid,
          email: decodedToken.email!,
          name: decodedToken.name || null,
          photoUrl: decodedToken.picture || null,
          provider: "google.com",
          availableTags: {
            create: [
              { name: "Remote", color: "#4CAF50" },
              { name: "Hybrid", color: "#FFC107" },
              { name: "Onsite", color: "#2196F3" },
            ],
          },
        },
        include: { availableTags: true },
      });
      logger.info("New user created", { userId: user.id, email: user.email });
    } else {
      logger.info("User logged in", { userId: user.id, email: user.email });
    }

    return sendSuccess({
      response: res,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        photoUrl: user.photoUrl,
      },
      message: isNewUser ? "User registered successfully" : "Login successful",
      statusCode: isNewUser ? 201 : 200,
    });
  } catch (error) {
    logger.error("Google auth error", { error });
    return sendError({
      response: res,
      message: "Invalid token or authentication failed",
      statusCode: 401,
      code: ErrorCodesEnum.UNAUTHORIZED,
    });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { firebaseUid: req.user!.uid },
    });

    if (!user) {
      logger.warn("User not found in database", { firebaseUid: req.user!.uid });
      return sendError({
        response: res,
        message: "User not found",
        statusCode: 404,
        code: ErrorCodesEnum.NOT_FOUND,
      });
    }

    return sendSuccess({
      response: res,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        photoUrl: user.photoUrl,
      },
      message: "User fetched successfully",
      statusCode: 200,
    });
  } catch (error) {
    logger.error("Get user error", { error });
    return sendError({
      response: res,
      message: "Failed to fetch user",
      statusCode: 500,
      code: ErrorCodesEnum.INTERNAL_SERVER_ERROR,
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    await adminAuth.revokeRefreshTokens(req.user!.uid);

    logger.info("User logged out", { firebaseUid: req.user!.uid });

    return sendSuccess({ message: "Logout successful", response: res });
  } catch (error) {
    logger.error("Logout error", { error });
    return sendError({
      response: res,
      message: "Failed to logout",
      statusCode: 500,
      code: ErrorCodesEnum.INTERNAL_SERVER_ERROR,
    });
  }
};
