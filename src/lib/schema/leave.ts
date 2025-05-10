import { z } from "zod";

export const leaveApprovalSchema = z.object({
  status: z.string().min(1, "Status is required"),
  comment: z
    .string()
    .min(5, "Comment must be at least 5 characters")
    .max(500, "Comment must be under 500 characters"),
});