import { DepartmentResponse } from "./department-roles";

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
  data: any[];
  message: string;
};

export type DeleteResponse = {
  message: string;
  success: boolean;
};

export type PaginatedDepartmentResponse = {
  data: DepartmentResponse[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  message?: string;
};

export type PaginatedRoleResponse = {
  data: any[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  message?: string;
};
