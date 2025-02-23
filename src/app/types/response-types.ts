import { DepartmentResponse, Role } from "./department-roles";
import { Employee } from "./employee-types";

export type CountryDetails = {
    name: string;
    flag: string;
};

export type CountryDetailsResponse = {
    success: boolean;
    data?: CountryDetails[];
    message?: string;
};

export type RoleResponse = {
    success: boolean;
    data: Role[];
    message: string;
};

export type DeleteResponse = {
    message: string;
    success: boolean;
}

export type PaginatedDepartmentResponse = {
    data: DepartmentResponse[];
    totalPages: number;
    totalElements: number;
    currentPage: number;
    message?: string;
};

export type PaginatedRoleResponse = {
    data: Role[];
    totalPages: number;
    totalElements: number;
    currentPage: number;
    message?: string;
};

export type PaginatedEmployeeResponse = {
  data: Employee[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  message?: string;
};
