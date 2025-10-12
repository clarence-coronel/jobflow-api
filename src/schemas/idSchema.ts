import z from "zod/v3";

export const idSchema = z.object({
  id: z.string().uuid("Invalid UUID format"),
});
