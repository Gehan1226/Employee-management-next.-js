"use server";
import axios from "axios";
import axioInstance from "../lib/axios";
import { PaginatedDepartmentResponse } from "../types/response-types";
import {
  DepartmentEmployeeCount,
  DepartmentFormValues,
  DepartmentResponse,
} from "../types/department-roles";

export const getAllDepartments = async (): Promise<DepartmentResponse[]> => {
  try {
    const response = await axioInstance.get("/api/v1/departments");
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response.data?.errorMessage ||
            "An error occurred during fetching departments."
        );
      } else if (error.request) {
        throw new Error(
          "No department response received from the server. Please check your network connection."
        );
      } else {
        throw new Error(
          error.message ||
            "An unexpected error occurred while fetching departments."
        );
      }
    } else {
      throw new Error(
        (error as Error).message ||
          "An unexpected error occurred while fetching departments."
      );
    }
  }
};

export const getAllDepartmentsWithPagination = async (
  currentPage: number,
  searchTerms: string | null
): Promise<Partial<PaginatedDepartmentResponse>> => {
  const url = process.env.NEXT_PUBLIC_API_PAGINATED_DEPARTMENTS;
  if (!url) {
    console.error(
      "Environment variable 'NEXT_PUBLIC_API_PAGINATED_DEPARTMENTS' is not defined."
    );
    throw new Error(
      "API URL is undefined. Please check your environment variables."
    );
  }

  try {
    const params: Record<string, number | string> = {
      page: currentPage,
      size: 5,
    };
    if (searchTerms) params.searchTerm = searchTerms;
    const response = await axioInstance.get(url, { params });
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
            error.response.data?.errorMessage ||
            "An error occurred during registration",
        };
      } else if (error.request) {
        return {
          message:
            "No response received from the server. Please check your network connection.",
        };
      } else {
        return { message: error.message || "An unexpected error occurred." };
      }
    } else if (error instanceof Error) {
      return { message: error.message };
    } else {
      return { message: "An unexpected error occurred." };
    }
  }
};

export const addDepartment = async (
  department: DepartmentFormValues
): Promise<string> => {
  const data = {
    name: department.name,
    responsibility: department.responsibility,
    manager: {
      id: department.manager,
    },
  };

  try {
    const response = await axioInstance.post("/api/v1/department/add", data);
    return response.data.message;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response.data?.errorMessage ||
            "An error occurred during department creation."
        );
      } else if (error.request) {
        throw new Error(
          "No response received from the server. Please check your network connection."
        );
      } else {
        throw new Error(error.message || "An unexpected error occurred.");
      }
    } else {
      throw new Error(
        (error as Error).message || "An unexpected error occurred."
      );
    }
  }
};

export const retrieveDepartmentEmployeeCounts = async (): Promise<
  DepartmentEmployeeCount[]
> => {
  try {
    const response = await axioInstance.get(
      "/api/v1/department/names-and-employee-counts"
    );
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response.data?.errorMessage || "An error occurred."
        );
      } else if (error.request) {
        throw new Error(
          "No response received from the server. Please check your network connection."
        );
      } else {
        throw new Error(error.message || "An unexpected error occurred.");
      }
    } else {
      throw new Error(
        (error as Error).message || "An unexpected error occurred."
      );
    }
  }
};
