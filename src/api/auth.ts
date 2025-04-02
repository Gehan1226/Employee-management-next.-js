"use server";
import axios from "axios";
import axioInstance from "../lib/axios";
import {
  BasicUserInfoResponse,
  UserResponse,
  UserWithRoleAndEnabledStatus,
} from "@/types/auth-types";
import { z } from "zod";
import { userLoginFormSchema, userRegisterFormSchema } from "@/lib/schema/user";
import { createAuthCookie } from "@/lib/util/cookie";

export const saveUser = async (
  data: z.infer<typeof userRegisterFormSchema>
): Promise<string> => {
  const requestData = {
    userName: data.userName,
    email: data.email,
    password: data.password,
    roleList: ["EMPLOYEE"],
  };

  try {
    const response = await axioInstance.post("/api/v1/auth", requestData);
    return response.data.message;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response.data?.errorMessage ||
            "An error occurred during user signup"
        );
      } else if (error.request) {
        throw new Error(
          "No response received from the server. Please check your network connection."
        );
      } else {
        throw new Error(
          error.message || "An unexpected error occurred during user signup."
        );
      }
    } else {
      throw new Error(
        (error as Error).message ||
          "An unexpected error occurred during user signup."
      );
    }
  }
};

export const userLogin = async (
  data: z.infer<typeof userLoginFormSchema>
): Promise<string> => {
  try {
    const response = await axioInstance.post("/api/v1/auth/login", data);

    const responseData = response.data;
    if (responseData.data?.token) {
      await createAuthCookie(responseData.data.token);
    }

    return response.data.message;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response.data?.errorMessage ||
            "An error occurred during user login"
        );
      } else if (error.request) {
        throw new Error(
          "No response received from the server. Please check your network connection."
        );
      } else {
        throw new Error(
          error.message || "An unexpected error occurred during user login."
        );
      }
    } else {
      throw new Error(
        (error as Error).message ||
          "An unexpected error occurred during user login."
      );
    }
  }
};

export const getDisabledUsers = async (
  currentPage: number,
  startDate: string | null,
  endDate: string | null,
  searchTerms: string | null
): Promise<Partial<BasicUserInfoResponse>> => {
  const url = process.env.NEXT_PUBLIC_DISABLED_USERS_API;
  if (!url) {
    console.error(
      "Environment variable 'NEXT_PUBLIC_DISABLED_USERS_API' is not defined."
    );
    throw new Error(
      "API URL is undefined. Please check your environment variables."
    );
  }

  try {
    const params: Record<string, unknown> = { page: currentPage, size: 10 };
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
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
            "An error occurred during registration",
        };
      } else if (error.request) {
        return {
          message:
            "No response received from the server. Please check your network connection.",
        };
      } else {
        return {
          message: error.message || "An unexpected error occurred.",
        };
      }
    } else if (error instanceof Error) {
      return { message: error.message };
    } else {
      return { message: "An unexpected error occurred." };
    }
  }
};

export const updateUserRoleAndEnabledStatus = async (
  user: UserWithRoleAndEnabledStatus
): Promise<string> => {
  const url = process.env.NEXT_PUBLIC_API_UPDATE_USER_ROLE_AND_ENABLE_STATUS;
  if (!url) {
    console.error(
      "Environment variable 'NEXT_PUBLIC_DISABLED_USERS_API' is not defined."
    );
    throw new Error(
      "API URL is undefined. Please check your environment variables."
    );
  }

  try {
    const response = await axioInstance.patch(url, user);
    return response.data.message;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return (
          error.response.data?.errorMessage ||
          "An error occurred during updating user role and enabled status."
        );
      } else if (error.request) {
        return "No response received from the server. Please check your network connection.";
      } else {
        return error.message || "An unexpected error occurred.";
      }
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return "An unexpected error occurred.";
    }
  }
};

export const deleteUser = async (userEmail: string): Promise<string> => {
  const url = process.env.NEXT_PUBLIC_API_DELETE_USER;
  if (!url) {
    console.error(
      "Environment variable 'NEXT_PUBLIC_DISABLED_USERS_API' is not defined."
    );
    throw new Error(
      "API URL is undefined. Please check your environment variables."
    );
  }

  try {
    const response = await axioInstance.delete(`${url}/${userEmail}`);
    return response.data.message;
  } catch (error: unknown) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return (
          error.response.data?.errorMessage ||
          "An error occurred during deleting user."
        );
      } else if (error.request) {
        return "No response received from the server. Please check your network connection.";
      } else {
        return error.message || "An unexpected error occurred.";
      }
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return "An unexpected error occurred.";
    }
  }
};

export const getUserDetailsByName = async (name: string): Promise<UserResponse> => {
  try{
    const response = await axioInstance.get(`/api/v1/user/${name}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response.data?.errorMessage ||
            "An error occurred during fetching user details."
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