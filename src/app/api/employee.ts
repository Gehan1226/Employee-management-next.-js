import axios from "axios";
import axioInstance from "../lib/axios";
import { validateEmployee } from "../lib/util/employee-schemas";
import { RegisterEmployeeResponse } from "../types/employee-types";
import { PaginatedEmployeeResponse } from "../types/response-types";

export const registerEmployee = async (
  prevState: unknown,
  formData: FormData
): Promise<Partial<RegisterEmployeeResponse>> => {
  const employeeData = Object.fromEntries(formData.entries()) as Record<
    string,
    string
  >;
  const validatedData = validateEmployee(employeeData);

  if (validatedData.validationErrors) {
    return { prevData: employeeData, ...validatedData };
  }

  const [month, day, year] = employeeData.dob.split("/").map(Number);
  employeeData.dob = `${year}-${String(month).padStart(2, "0")}-${String(
    day
  ).padStart(2, "0")}`;

  try {
    const response = await axioInstance.post(
      "/api/v1/employee/add",
      employeeData
    );
    return { success: true, message: response.data.message };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return {
          backendErrors:
            error.response.data?.errorMessage ||
            "An error occurred during registration",
          prevData: employeeData,
        };
      } else if (error.request) {
        return {
          backendErrors:
            "No response received from the server. Please check your network connection.",
          prevData: employeeData,
        };
      } else {
        return {
          backendErrors: error.message || "An unexpected error occurred.",
          prevData: employeeData,
        };
      }
    } else {
      return {
        backendErrors: error.message || "An unexpected error occurred.",
        prevData: employeeData,
      };
    }
  }
};

export const getAllEmployeesWithPagination = async (
  currentPage: number,
  searchTerms: string | null
): Promise<Partial<PaginatedEmployeeResponse>> => {
  const url = process.env.NEXT_PUBLIC_API_PAGINATED_EMPLOYEES;
  if (!url) {
    console.error(
      "Environment variable 'NEXT_PUBLIC_API_PAGINATED_EMPLOYEES' is not defined."
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
      return { message: (error as Error)?.message || "An unexpected error occurred." };
    }
  }
};


export const getEmployeesWithoutManagers = async () => {
  try {
    const response = await axioInstance.get("/api/v1/employee/without-manager");
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response.data?.errorMessage || "An error occurred during fetching employees.";
      } else if (error.request) {
        return "No response received from the server. Please check your network connection.";
      }
      return error.message || "An unexpected error occurred.";
    } else {
      return (error as Error)?.message || "An unexpected error occurred.";
    }
  }
};
