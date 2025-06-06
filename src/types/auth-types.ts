import { EmployeeResponse } from "./employee";

export type UserData = {
    userName: string;
    email: string;
    password: string;
    repeatPassword: string;
};


export type BasicUserInfo  = {
    userName: string;
    email: string;
}

export type BasicUserInfoResponse = {
    data: BasicUserInfo[];
    message: string;
    totalPages: number;
    totalElements: number;
    currentPage: number;
}

export type UserWithRoleAndEnabledStatus = {
    userName: string;
    email: string;
    role: string;
    enabled: boolean;
}

export type UserFilters = {
    startDate: string | null;
    endDate: string | null;
    searchTerm: string | null;
}

export type UserRole = "ADMIN" | "MANAGER" | "EMPLOYEE";

export type UserResponse = {
  userName: string;
  email: string;
  roleList: UserRole[];
  enabled: boolean;
  createdDate: string;
  employee?: EmployeeResponse;
};