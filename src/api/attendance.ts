import axioInstance from "@/lib/axios";
import { isValidDate } from "@/lib/util/date";
import axios from "axios";

export const getAttendance = async (employeeId: number, date: string) => {
  if (!isValidDate(date)) {
    throw new Error(
      "Invalid date format or value. Expected format: yyyy-MM-dd"
    );
  }

  try {
    const response = await axioInstance.get(`/api/attendance/${employeeId}`, {
      params: { date },
    });
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response.data?.errorMessage ??
            "An error occurred during attendance fetching."
        );
      } else if (error.request) {
        throw new Error(
          "No response received from the server. Please check your network connection."
        );
      } else {
        throw new Error(
          error.message ||
            "An unexpected error occurred during attendance fetching."
        );
      }
    } else {
      throw new Error(
        (error as Error).message ||
          "An unexpected error occurred during attendance fetching."
      );
    }
  }
};
