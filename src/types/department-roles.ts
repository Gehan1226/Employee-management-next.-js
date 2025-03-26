import { z } from "zod";
import { departmentSchema, roleSchema } from "../lib/util/schemas";

type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dob: string; 
  phoneNumber: string;
  gender: string;
};

type Manager = {
  id: number;
  employee: Employee;
};

export type DepartmentResponse = {
  id: number;
  name: string;
  responsibility: string;
  manager: Manager;
  employeeCount: number | null;
};

export type RoleResponse = {
  id: number;
  name: string;
  description: string;
  employeeCount: number;
  department: DepartmentResponse;
};




export type DepartmentFormValues = z.infer<typeof departmentSchema>;

export type RoleFormValues = z.infer<typeof roleSchema>;

export type DepartmentEmployeeCount = {
  name: string;
  employeeCount: number;
};