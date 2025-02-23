import { z } from "zod";

export const departmentSchema = z.object({
  name: z.string().min(3, "Department name must be at least 3 characters"),
  responsibility: z
    .string()
    .min(5, "Responsibility must be at least 5 characters"),
  manager: z.string().min(1, "Manager is required"),
});

export const roleSchema = z.object({
  name: z.string().min(3, "Role name must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  department: z.string().min(1, "Department is required"),
});