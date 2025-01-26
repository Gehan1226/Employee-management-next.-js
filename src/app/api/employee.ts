import axios from "axios";
import axioInstance from "../lib/axios";
import { validateEmployee } from "../lib/util/employee-schemas";
import { RegisterEmployeeResponse } from "../types/employee-types";
import { PaginatedEmployeeResponse } from "../types/response-types";

export const registerEmployee = async (
  prevState: any,
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
  } catch (error: any) {
    console.log(error);
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
