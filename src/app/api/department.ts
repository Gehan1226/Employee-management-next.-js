"use server";

import axios from "axios";
import axioInstance from "../lib/axios";
import {
  DepartmentResponse,
  PaginatedDepartmentResponse,
} from "../types/response-types";
import { DepartmentFormValues } from "../types/department-roles";

export const getAllDepartments = async (): Promise<
  Partial<DepartmentResponse>
> => {
  try {
    const response = await axioInstance.get("/api/v1/department/get-all");
    return { success: true, data: response.data.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return {
          message:
            error.response.data?.errorMessage ||
            "An error occurred during fetching departments.",
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
    const params: Record<string, number | string> = { page: currentPage, size: 5 };
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

export const addDepartment = async (department: DepartmentFormValues) => {
  try {
    const response = await axioInstance.post("/api/v1/department/add", department);
    return response.data.message;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return { message: error.response.data?.errorMessage || "An error occurred during registration" };
      } else if (error.request) {
        return { message: "No response received from the server. Please check your network connection." };
      } else {
        return { message: error.message || "An unexpected error occurred." };
      }
    } else if (error instanceof Error) {
      return { message: error.message };
    } else {
      return { message: "An unexpected error occurred." };
    }
  }
}