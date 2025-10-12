import { JobApplicationStatus } from "@prisma/client";
import z from "zod/v3";

export const createJobApplicationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  sourceName: z.string().optional().nullable(),
  sourceUrl: z.string().optional().nullable(),
  resumeUrl: z.string().url().optional().nullable(),

  // optional but if provided must be one of the enum values
  status: z.nativeEnum(JobApplicationStatus).optional().default("WISHLIST"),

  /**
   * tagIds: optional array of tag UUIDs (will still validate membership server-side)
   * ensure uniqueness of the array if provided
   */
  tagIds: z
    .array(z.string().uuid())
    .optional()
    .nullable()
    .refine(
      (arr) => (arr ? new Set(arr).size === arr.length : true),
      "tagIds must be unique"
    ),
});

export const getJobApplicationByStatusSchema = z.object({
  status: z
    .string()
    .transform((val) => val.toUpperCase())
    .pipe(z.nativeEnum(JobApplicationStatus)),
});

export const updateJobApplicationOrderSchema = z.object({
  status: z
    .string()
    .transform((val) => val.toUpperCase())
    .pipe(z.nativeEnum(JobApplicationStatus)),
  orders: z
    .array(
      z.object({
        id: z.string().uuid(),
        order: z.number().int().min(0),
      })
    )
    .min(1, "At least one job application is required"),
});
