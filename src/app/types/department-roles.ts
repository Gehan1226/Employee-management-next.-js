import { Employee } from "./employee-types";

export type Department = {
  name: string;
  manager: Employee;
  responsibility: string;
  employeeCount: number;
};

export type Role = {
  name: string;
  description: string;
  employeeCount: number;
};