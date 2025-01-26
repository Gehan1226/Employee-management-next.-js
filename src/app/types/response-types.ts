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

// export type Department = {
//     id: number;
//     name: string;
// }
export type Department = {
  name: string;
  manager: string;
  responsibility: string;
  employeeCount: number;
};


export type DepartmentResponse = {
    success: boolean;
    data: Department[];
    message: string;
};

// export type Role = {
//     id: number;
//     name: string;
// };

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
    data: Department[];
    totalPages: number;
    totalElements: number;
    currentPage: number;
    message?: string;
};

export type Role = {
  name: string;
  description: string;
  employeeCount: number;
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
