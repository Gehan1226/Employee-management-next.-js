"use server";
import axios from "axios";
import axioInstance from "../lib/axios";
import {
  EmployeeCreateRequest,
  EmployeeQueryParams,
  EmployeeResponse,
} from "../types/employee";
import { PaginatedEmployeeResponse } from "../types/response-types";
import { PaginatedResponse } from "@/types/paginations";

export const saveEmployee = async (
  data: EmployeeCreateRequest
): Promise<string> => {
  try {
    const response = await axioInstance.post("/api/v1/employees", data);
    return response.data.message;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response.data?.errorMessage ||
            "An error occurred during employee registration"
        );
      } else if (error.request) {
        throw new Error(
          "No response received from the server. Please check your network connection."
        );
      } else {
        throw new Error(
          error.message ||
            "An unexpected error occurred during employee registration."
        );
      }
    } else {
      throw new Error(
        (error as Error).message ||
          "An unexpected error occurred during employee registration."
      );
    }
  }
};

export const getAllEmployeesWithPagination = async (
  currentPage: number,
  searchTerms: string | null
): Promise<Partial<PaginatedEmployeeResponse>> => {
  try {
    const params: Record<string, number | string> = {
      page: currentPage,
      size: 5,
    };
    if (searchTerms) params.searchTerm = searchTerms;
    const response = await axioInstance.get(
      "/api/v1/employees/paginated-employees",
      { params }
    );
    return {
      data: response.data.data,
      totalPages: response.data.totalPages,
      totalElements: response.data.totalElements,
      currentPage: response.data.currentPage,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return {
          message:
            error.response.data?.errorMessage ??
            "An error occurred during fetching employees.",
        };
      } else if (error.request) {
        return {
          message:
            "No response received from the server. Please check your network connection.",
        };
      }
      return { message: error.message || "An unexpected error occurred." };
    } else {
      return {
        message: (error as Error)?.message || "An unexpected error occurred.",
      };
    }
  }
};

export const getEmployeesByDepartmentWithPagination = async (
  departmentId: number | undefined,
  { size, page, searchTerm }: EmployeeQueryParams
): Promise<PaginatedResponse<EmployeeResponse>> => {
  if (!departmentId) {
    throw new Error("Department ID not provided for employee fetching.");
  }
  try {
    const response = await axioInstance.get(
      `/api/v1/employees/by-department/${departmentId}`,
      {
        params: {
          size,
          page,
          searchTerm,
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response.data?.errorMessage ??
            "An error occurred during fetching employees."
        );
      } else if (error.request) {
        throw new Error(
          "No response received from the server. Please check your network connection."
        );
      }
      throw new Error(error.message || "An unexpected error occurred.");
    } else {
      throw new Error(
        (error as Error)?.message || "An unexpected error occurred."
      );
    }
  }
};

export const getEmployeesByDepartment = async (
  departmentId: number
): Promise<EmployeeResponse[]> => {
  try {
    const response = await axioInstance.get(
      `/api/v1/employees/by-department/${departmentId}/all`
    );
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response.data?.errorMessage ??
            "An error occurred during fetching employees."
        );
      } else if (error.request) {
        throw new Error(
          "No response received from the server. Please check your network connection."
        );
      }
      throw new Error(error.message || "An unexpected error occurred.");
    } else {
      throw new Error(
        (error as Error)?.message || "An unexpected error occurred."
      );
    }
  }
};

export const getEmployeesWithoutManagers = async (): Promise<
  EmployeeResponse[]
> => {
  try {
    const response = await axioInstance.get("/api/v1/employees/non-managers");
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response.data?.errorMessage ??
            "An error occurred during fetching employees."
        );
      } else if (error.request) {
        throw new Error(
          "No response received from the server. Please check your network connection."
        );
      }
      throw new Error(error.message || "An unexpected error occurred.");
    } else {
      throw new Error(
        (error as Error)?.message || "An unexpected error occurred."
      );
    }
  }
};
