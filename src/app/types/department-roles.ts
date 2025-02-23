import { z } from "zod";
import { departmentSchema } from "../lib/util/schemas";
import { Employee } from "./employee-types";

export type Department = {
  name: string;
  manager: Employee;
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