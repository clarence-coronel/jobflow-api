import { Router } from "express";
import authRoute from "./authRoute.ts";
import jobApplicationRoute from "./jobApplicationRoute.ts";

const router = Router();

router.use("/auth", authRoute);
router.use("/job-application", jobApplicationRoute);

export default router;
