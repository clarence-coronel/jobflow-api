import { Router } from "express";
import { authenticateToken, validateBody, validateParams } from "../middleware";
import {
  createJobApplication,
  deleteJobApplication,
  getAllJobApplications,
  getJobApplicationById,
  getJobApplicationsByStatus,
  updateJobApplicationOrder,
} from "../controllers/jobApplicationController";
import {
  createJobApplicationSchema,
  getJobApplicationByStatusSchema,
  idSchema,
  updateJobApplicationOrderSchema,
} from "../schemas";

const router = Router();

// Apply authentication to ALL routes in this router
router.use(authenticateToken);
router.get("/", getAllJobApplications);
router.get(
  "/status/:status",
  validateParams(getJobApplicationByStatusSchema),
  getJobApplicationsByStatus
);
router.get("/:id", validateParams(idSchema), getJobApplicationById);
router.post(
  "/create",
  validateBody(createJobApplicationSchema),
  createJobApplication
);
router.patch(
  "/reorder",
  validateBody(updateJobApplicationOrderSchema),
  updateJobApplicationOrder
);
router.delete("/:id", validateParams(idSchema), deleteJobApplication);

export default router;
