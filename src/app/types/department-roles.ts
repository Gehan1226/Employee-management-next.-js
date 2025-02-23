import { z } from "zod";
import { departmentSchema, roleSchema } from "../lib/util/schemas";
import { EmployeeResponse } from "./employee-types";

export type DepartmentResponse = {
  id: number;
  name: string;
  manager: EmployeeResponse;
  responsibility: string;
  employeeCount: number;
};

export type Role = {
  id: number;
  name: string;
  description: string;
  employeeCount: number;
};

export type DepartmentFormValues = z.infer<typeof departmentSchema>;

export type RoleFormValues = z.infer<typeof roleSchema>;

export type DepartmentEmployeeCount = {
  name: string;
  employeeCount: number;
};