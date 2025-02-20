import { z } from "zod";

export const departmentSchema = z.object({
  name: z.string().min(3, "Department name must be at least 3 characters"),
  responsibility: z
    .string()
    .min(5, "Responsibility must be at least 5 characters"),
  manager: z
    .string()
    .refine((val) => val !== "1", "Please select a valid manager"),
});
