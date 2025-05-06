import axioInstance from "@/lib/axios";
import { ManagerResponse } from "@/types/manager";
import axios from "axios";

export const getManagerByEmployeeId = async (
  employeeId: number
): Promise<ManagerResponse> => {
  try {
    const response = await axioInstance.get(
      `/api/v1/managers/by-employee-id/${employeeId}`
    );
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response.data?.errorMessage ?? "An error occurred during fetching manager."
        );
      } else if (error.request) {
        throw new Error(
          "No response received from the server. Please check your network connection."
        );
      } else {
        throw new Error(error.message || "An unexpected error occurred.");
      }
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};
