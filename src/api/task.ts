import axios from "axios";
import axioInstance from "../lib/axios";
import { TaskResponse } from "../types/response-types";
import { TaskCreateRequest } from "@/types/task";

export const getAllTasksWithPagination = async (
  searchTerm: string | null
): Promise<TaskResponse> => {
  try {
    const params: Record<string, number | string> = {
      page: 0,
      size: 5,
    };
    if (searchTerm) {
      params.searchTerm = searchTerm;
    }
    const response = await axioInstance.get("/api/v1/tasks/all-by-manager/1", {
      params,
    });
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response.data?.errorMessage ?? "An error occurred."
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

export const saveTask = async (data: TaskCreateRequest): Promise<string> => {
  console.log("hola", data);
  try {
    const response = await axioInstance.post("/api/v1/tasks", data);
    console.log(response);
    return response.data.message;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response.data?.errorMessage ??
            "An error occurred during task creation."
        );
      } else if (error.request) {
        throw new Error(
          "No response received from the server. Please check your network connection."
        );
      } else {
        throw new Error(
          error.message || "An unexpected error occurred during task creation."
        );
      }
    } else {
      throw new Error(
        (error as Error).message ||
          "An unexpected error occurred during task creation."
      );
    }
  }
};
