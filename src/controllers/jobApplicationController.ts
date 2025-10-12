import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { sendError, sendSuccess } from "../utils";
import { ErrorCodesEnum } from "../enums";
import {
  createJobApplicationSchema,
  getJobApplicationByStatusSchema,
  updateJobApplicationOrderSchema,
} from "../schemas/jobApplicationSchema";
import { logger } from "../lib";
import { idSchema } from "../schemas";

export const getAllJobApplications = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) throw new Error("User not found on request.");

  try {
    const jobApplications = await prisma.jobApplication.findMany({
      where: { user: { id: user.id }, deletedAt: null },
      include: { tags: true, requiredSkill: true },
      orderBy: { createdAt: "desc" },
      omit: { order: true },
    });

    logger.info(
      `Fetched ${jobApplications.length} job applications for user ${user.id}`
    );

    return sendSuccess({
      response: res,
      message: "Job applications fetched successfully",
      data: jobApplications,
      statusCode: 200,
    });
  } catch (error: any) {
    logger.error("Error fetching job applications", {
      error,
    });

    return sendError({
      response: res,
      message: "Failed to fetch job applications",
      code: ErrorCodesEnum.INTERNAL_SERVER_ERROR,
      details: error.message,
      statusCode: 500,
    });
  }
};

export const getJobApplicationById = async (req: Request, res: Response) => {
  const user = req.user;
  const { id } = idSchema.parse(req.params);

  if (!user) throw new Error("User not found on request.");

  try {
    const jobApplication = await prisma.jobApplication.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        tags: true,
        requiredSkill: true,
        reminders: true,
        jobApplicationStatusHistory: true,
      },
    });

    if (!jobApplication) {
      logger.info(`Job application not found for user ${user.id} (ID: ${id})`);
      return sendError({
        response: res,
        message: "Job application not found",
        code: ErrorCodesEnum.NOT_FOUND,
        details: `No job application found with ID: ${id}`,
        statusCode: 404,
      });
    }

    logger.info(`Fetched job application ${id} for user ${user.id}`);

    return sendSuccess({
      response: res,
      message: "Job application fetched successfully",
      data: jobApplication,
      statusCode: 200,
    });
  } catch (error: any) {
    logger.error("Error fetching job application", {
      error,
    });

    return sendError({
      response: res,
      message: "Failed to fetch job application",
      code: ErrorCodesEnum.INTERNAL_SERVER_ERROR,
      details: error.message,
      statusCode: 500,
    });
  }
};

export const getJobApplicationsByStatus = async (
  req: Request,
  res: Response
) => {
  const user = req.user;
  const { status } = getJobApplicationByStatusSchema.parse(req.params);

  if (!user) throw new Error("User not found on request.");

  try {
    const jobApplications = await prisma.jobApplication.findMany({
      where: {
        status,
        userId: user.id,
        deletedAt: null,
      },
      include: {
        tags: true,
        requiredSkill: true,
        reminders: true,
        jobApplicationStatusHistory: true,
      },
      orderBy: { order: "asc" },
    });

    if (jobApplications.length === 0) {
      logger.info(
        `Job applications not found for user ${user.id} (Status: ${status})`
      );
      return sendError({
        response: res,
        message: "Job applications not found",
        code: ErrorCodesEnum.NOT_FOUND,
        details: `No job applications found with status: ${status}`,
        statusCode: 404,
      });
    }

    logger.info(
      `Fetched ${jobApplications.length} job applications for user ${user.id} with status ${status}`
    );

    return sendSuccess({
      response: res,
      message: "Job applications fetched successfully",
      data: jobApplications,
      statusCode: 200,
    });
  } catch (error: any) {
    logger.error("Error fetching job applications", {
      error,
    });

    return sendError({
      response: res,
      message: "Failed to fetch job applications",
      code: ErrorCodesEnum.INTERNAL_SERVER_ERROR,
      details: error.message,
      statusCode: 500,
    });
  }
};

export const createJobApplication = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) throw new Error("User not found on request.");

  try {
    const {
      title,
      company,
      location,
      description,
      status,
      sourceName,
      sourceUrl,
      resumeUrl,
      tagIds,
    } = createJobApplicationSchema.parse(req.body);

    const maxOrderRecord = await prisma.jobApplication.findFirst({
      where: { userId: user.id, status },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = maxOrderRecord ? maxOrderRecord.order + 1 : 0;

    const tagsToConnect =
      Array.isArray(tagIds) && tagIds.length > 0
        ? tagIds.map((id) => ({ id }))
        : undefined;

    const jobApplication = await prisma.jobApplication.create({
      data: {
        title,
        company,
        location,
        description,
        status,
        resumeUrl,
        user: { connect: { id: user.id } },
        sourceName: sourceName ?? null,
        sourceUrl: sourceUrl ?? null,
        tags: tagsToConnect ? { connect: tagsToConnect } : undefined,
        order: newOrder,
      },
      include: {
        tags: true,
        requiredSkill: true,
      },
    });

    logger.info(`Job application created successfully by user ${user.id}`, {
      jobApplicationId: jobApplication.id,
    });

    return sendSuccess({
      response: res,
      message: "Job application created successfully",
      data: jobApplication,
      statusCode: 201,
    });
  } catch (error: any) {
    logger.error("Error creating job application", {
      error,
    });

    return sendError({
      response: res,
      message: "Failed to create job application",
      code: ErrorCodesEnum.INTERNAL_SERVER_ERROR,
      details: error.message,
      statusCode: 500,
    });
  }
};

export const updateJobApplicationOrder = async (
  req: Request,
  res: Response
) => {
  const user = req.user;

  if (!user) throw new Error("User not found on request.");

  try {
    const { status, orders } = updateJobApplicationOrderSchema.parse(req.body);

    const jobApplicationIds = orders.map((o) => o.id);
    const orderValues = orders.map((o) => o.order);

    // Check for duplicate IDs
    const uniqueIds = new Set(jobApplicationIds);
    if (uniqueIds.size !== jobApplicationIds.length) {
      return sendError({
        response: res,
        message: "Duplicate job application IDs",
        code: ErrorCodesEnum.BAD_REQUEST,
        details: "Job application IDs must be unique",
        statusCode: 400,
      });
    }

    // Check for duplicate order values
    const uniqueOrders = new Set(orderValues);
    if (uniqueOrders.size !== orderValues.length) {
      return sendError({
        response: res,
        message: "Duplicate order values",
        code: ErrorCodesEnum.BAD_REQUEST,
        details: "Order values must be unique",
        statusCode: 400,
      });
    }

    // Verify all job applications belong to the user and have the correct status
    const jobApplications = await prisma.jobApplication.findMany({
      where: {
        id: { in: jobApplicationIds },
        userId: user.id,
        status,
        deletedAt: null,
      },
      select: { id: true },
    });

    if (jobApplications.length !== jobApplicationIds.length) {
      return sendError({
        response: res,
        message: "Invalid job application IDs",
        code: ErrorCodesEnum.BAD_REQUEST,
        details:
          "Some job application IDs do not exist, don't belong to you, or don't match the status",
        statusCode: 400,
      });
    }

    // Step 1: Set all to negative temporary orders to avoid conflicts
    const tempUpdates = jobApplicationIds.map((id, index) =>
      prisma.jobApplication.update({
        where: { id },
        data: { order: -(index + 1) },
      })
    );
    await prisma.$transaction(tempUpdates);

    // Step 2: Update to final orders
    const finalUpdates = orders.map(({ id, order }) =>
      prisma.jobApplication.update({
        where: { id },
        data: { order },
        include: {
          tags: true,
          requiredSkill: true,
          reminders: true,
          jobApplicationStatusHistory: true,
        },
      })
    );
    const updatedApplications = await prisma.$transaction(finalUpdates);

    logger.info(
      `Updated order for ${jobApplicationIds.length} job applications for user ${user.id}`,
      { status }
    );

    return sendSuccess({
      response: res,
      message: "Job application order updated successfully",
      data: updatedApplications,
      statusCode: 200,
    });
  } catch (error: any) {
    logger.error("Error updating job application order", {
      error,
    });

    return sendError({
      response: res,
      message: "Failed to update job application order",
      code: ErrorCodesEnum.INTERNAL_SERVER_ERROR,
      details: error.message,
      statusCode: 500,
    });
  }
};

export const deleteJobApplication = async (req: Request, res: Response) => {
  const user = req.user;
  const { id } = idSchema.parse(req.params);

  if (!user) throw new Error("User not found on request.");

  try {
    const existing = await prisma.jobApplication.findFirst({
      where: {
        id,
        userId: user.id,
        deletedAt: null,
      },
    });

    if (!existing) {
      logger.info(`Delete failed — job application not found (ID: ${id})`);
      return sendError({
        response: res,
        message: "Job application not found or already deleted",
        code: ErrorCodesEnum.NOT_FOUND,
        statusCode: 404,
      });
    }

    const deletedJobApplication = await prisma.jobApplication.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    logger.info(`Job application soft-deleted by user ${user.id}`, {
      jobApplicationId: id,
    });

    return sendSuccess({
      response: res,
      message: "Job application deleted successfully",
      data: deletedJobApplication,
      statusCode: 200,
    });
  } catch (error: any) {
    logger.error("Error deleting job application", { error });

    return sendError({
      response: res,
      message: "Failed to delete job application",
      code: ErrorCodesEnum.INTERNAL_SERVER_ERROR,
      details: error.message,
      statusCode: 500,
    });
  }
};
