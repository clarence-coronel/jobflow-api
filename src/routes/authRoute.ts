import { Router } from "express";

import { authenticateToken } from "../middleware";
import { getCurrentUser, googleAuth, logout } from "../controllers";

const router = Router();

// Google OAuth login/register
router.post("/google", googleAuth);

// Get current user (protected route)
router.get("/me", authenticateToken, getCurrentUser);

// Logout (protected route)
router.post("/logout", authenticateToken, logout);

export default router;
