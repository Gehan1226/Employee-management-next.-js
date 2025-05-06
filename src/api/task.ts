import axios from "axios";
import axioInstance from "../lib/axios";
import { PaginatedTaskResponse, TaskCreateRequest, TaskUpdateRequest } from "@/types/task";

export const getAllTasksWithPagination = async (
  managerId: number,
  searchTerm: string | null,
  page: number
): Promise<PaginatedTaskResponse> => {
  try {
    const params: Record<string, number | string> = {
      page,
      size: 5,
    };
    if (searchTerm) {
      params.searchTerm = searchTerm;
    }
    const response = await axioInstance.get(
      `/api/v1/tasks/all-by-manager/${managerId}`,
      {
        params,
      }
    );
    return response.data;
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

export const updateTask = async (
  id: number,
  data: TaskUpdateRequest
): Promise<string> => {
  try {
    const response = await axioInstance.patch(`/api/v1/tasks/${id}`, data);
    return response.data.message;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response.data?.errorMessage ??
            "An error occurred during task update."
        );
      } else if (error.request) {
        throw new Error(
          "No response received from the server. Please check your network connection."
        );
      } else {
        throw new Error(
          error.message || "An unexpected error occurred during task update."
        );
      }
    } else {
      throw new Error(
        (error as Error).message ||
          "An unexpected error occurred during task update."
      );
    }
  }
};

export const deleteTask = async (id: number): Promise<string> => {
  try {
    const response = await axioInstance.delete(`/api/v1/tasks/${id}`);
    return response.data.message;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response.data?.errorMessage ??
            "An error occurred during task deletion."
        );
      } else if (error.request) {
        throw new Error(
          "No response received from the server. Please check your network connection."
        );
      } else {
        throw new Error(
          error.message || "An unexpected error occurred during task deletion."
        );
      }
    } else {
      throw new Error(
        (error as Error).message ||
          "An unexpected error occurred during task deletion."
      );
    }
  }
};
