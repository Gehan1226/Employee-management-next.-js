import axios from "axios";
import axioInstance from "../lib/axios";
import { TaskResponse } from "../types/response-types";

export const getAllTasksWithPagination = async (): Promise<TaskResponse> => {
    try {
    const response = await axioInstance.get(
      "/api/v1/task/get-all-paginated?searchTerm=145&page=0&size=5"
    );
    return response.data.data;
  } catch (error: unknown) {
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