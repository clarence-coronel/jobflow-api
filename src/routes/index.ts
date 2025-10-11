import { Router } from "express";
import authRoute from "./authRoute.ts";

const router = Router();

router.use("/auth", authRoute);

export default router;
