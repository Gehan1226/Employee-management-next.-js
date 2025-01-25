import axios from "axios";
import axioInstance from "../lib/axios";
import { PaginatedRoleResponse, RoleResponse } from "../types/response-types";

export const getRolesByDepartment = async (departmentId: string): Promise<Partial<RoleResponse>> => {
    try {
        const response = await axioInstance.get(`/api/v1/role/get-by-department/${departmentId}`);
        return {success: true, data: response.data.data};        
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                return { message: error.response.data?.errorMessage || "An error occurred during fetching departments."};
            } else if (error.request) {
                return { message: "No response received from the server. Please check your network connection."};
            } else {
                return { message: error.message || "An unexpected error occurred."};
            }
        } else {
            return { message: error.message || "An unexpected error occurred."};
        }
    }
}

export const getAllRolesWithPagination = async (
  currentPage: number,
  searchTerms: string | null
): Promise<Partial<PaginatedRoleResponse>> => {
  const url = process.env.NEXT_PUBLIC_API_PAGINATED_ROLES;
  if (!url) {
    console.error(
      "Environment variable 'NEXT_PUBLIC_DISABLED_USERS_API' is not defined."
    );
    throw new Error(
      "API URL is undefined. Please check your environment variables."
    );
  }

  try {
    const params: Record<string, any> = { page: currentPage, size: 5 };
    if (searchTerms) params.searchTerm = searchTerms;
    const response = await axioInstance.get(url, { params });
    return {
      data: response.data.data,
      totalPages: response.data.totalPages,
      totalElements: response.data.totalElements,
      currentPage: response.data.currentPage,
    };
  } catch (error: any) {
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
    } else {
      return { message: error.message || "An unexpected error occurred." };
    }
  }
};