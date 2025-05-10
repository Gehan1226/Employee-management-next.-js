import axioInstance from "@/lib/axios";
import { LeaveApprovedRequest, LeaveResponse } from "@/types/leaves";
import axios from "axios";

export const getLeavesByDepartmentId = async (departmentId: number): Promise<LeaveResponse[]> => {
  try {
    const response = await axioInstance.get(
      `http://localhost:8080/api/v1/leaves/by-department-id/${departmentId}?status=PENDING`
    );
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response.data?.errorMessage ??
            "An error occurred during fetching leaves."
        );
      } else if (error.request) {
        throw new Error(
          "No response received from the server. Please check your network connection."
        );
      }
      throw new Error(
        error.message || "An unexpected error occurred while fetching leaves."
      );
    } else {
      throw new Error(
        (error as Error)?.message ||
          "An unexpected error occurred while fetching leaves."
      );
    }
  }
};

export const approveLeave = async (data: LeaveApprovedRequest): Promise<string> => {
  try {
    const response = await axioInstance.post("http://localhost:8080/api/v1/leaves/approve", data);
    return response.data.message;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response.data?.errorMessage ?? "An error occurred during approving leave."
        );
      } else if (error.request) {
        throw new Error(
          "No response received from the server. Please check your network connection."
        );
      }
      throw new Error(error.message || "An unexpected error occurred while approving leave.");
    } else {
      throw new Error((error as Error)?.message || "An unexpected error occurred while approving leave.");
    }
  }
};