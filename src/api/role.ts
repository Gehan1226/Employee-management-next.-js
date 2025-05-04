import axios from "axios";
import axioInstance from "../lib/axios";
import { PaginatedRoleResponse } from "../types/response-types";
import { RoleFormValues, RoleResponse } from "../types/department-roles";

export const getRolesByDepartment = async (
  departmentId: string | null | undefined
): Promise<RoleResponse[]> => {
  if (!departmentId) {
    throw new Error("Department ID not provided for role fetching.");
  }

  try {
    const response = await axioInstance.get(
      `/api/v1/role/by-department/${departmentId}`
    );
    return response.data.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data?.errorMessage || "An error occurred.");
      } else if (error.request) {
        throw new Error(
          "No response received from the server. Please check your network connection."
        );
      } else {
        throw new Error(error.message || "An unexpected error occurred.");
      }
    } else {
      throw new Error((error as Error).message || "An unexpected error occurred.");
    }
  }
};

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

export const addRole = async (role: RoleFormValues): Promise<string> => {
  const data = {
    name: role.name,
    description: role.description,
    department: {
      id: role.department,
    },
  };
  try {
    const response = await axioInstance.post("/api/v1/role", data);
    return response.data.message;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response.data?.errorMessage ||
            "An error occurred during registration"
        );
      } else if (error.request) {
        throw new Error(
          "No response received from the server. Please check your network connection."
        );
      }
      throw new Error(error.message || "An unexpected error occurred.");
    } else {
      throw new Error(
        (error as Error).message || "An unexpected error occurred."
      );
    }
  }
};
