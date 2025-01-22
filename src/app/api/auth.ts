import axios from "axios";
import { validateUserData } from "../lib/util/user-schemas";
import axioInstance from "../lib/axios";


export const registerUser = async (prevState: any, formData: FormData): Promise<Partial<AuthResponse>> => {
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;
    const validatedData = validateUserData(data, "Register");

    if (validatedData.validationErrors) {
        return { prevData: data, ...validatedData };
    }

    try {
        const { repeatPassword, ...filteredData } = data;
        const response = await axioInstance.post("/api/v1/auth/register", filteredData);
        return { success: true, message: response.data.message };
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                return {
                    backendErrors: error.response.data?.errorMessage || "An error occurred during registration", prevData: data
                };
            } else if (error.request) {
                return {
                    backendErrors: "No response received from the server. Please check your network connection.", prevData: data
                };
            } else {
                return { backendErrors: error.message || "An unexpected error occurred.", prevData: data };
            }
        } else {
            return { backendErrors: error.message || "An unexpected error occurred.", prevData: data };
        }
    }
};

export const userLogin = async (prevState: any, formData: FormData): Promise<Partial<AuthResponse>> => {
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;
    const validatedData = validateUserData(data, "Login");

    if (validatedData.validationErrors) {
        return { prevData: data, ...validatedData };
    }

    try {
        const { repeatPassword, ...filteredData } = data;
        const response = await axioInstance.post("/user/login", filteredData);
        return { success: true, message: response.data.message };
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                return {
                    backendErrors: error.response.data?.errorMessage || "An error occurred during registration", prevData: data
                };
            } else if (error.request) {
                return {
                    backendErrors: "No response received from the server. Please check your network connection.", prevData: data
                };
            } else {
                return { backendErrors: error.message || "An unexpected error occurred.", prevData: data };
            }
        } else {
            return { backendErrors: error.message || "An unexpected error occurred.", prevData: data };
        }
    }
}

export const getDisabledUsers = async (
    currentPage: number,
    startDate: string | null,
    endDate: string | null,
    searchTerms: string | null
): Promise<Partial<BasicUserInfoResponse>> => {
    const url = process.env.NEXT_PUBLIC_DISABLED_USERS_API;
    if (!url) {
        console.error("Environment variable 'NEXT_PUBLIC_DISABLED_USERS_API' is not defined.");
        throw new Error("API URL is undefined. Please check your environment variables.");
    }

    try {
        const params: Record<string, any> = { page: currentPage, size: 10 };
        if (startDate) params.startDate = startDate;
        if (endDate) params.endDate = endDate;
        if (searchTerms) params.searchTerm = searchTerms;

        const response = await axioInstance.get(url, { params });
        return {
            data: response.data.data,
            totalPages: response.data.totalPages,
            totalElements: response.data.totalElements,
            currentPage: response.data.currentPage
        };
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                return {
                    message: error.response.data?.errorMessage || "An error occurred during registration"
                };
            } else if (error.request) {
                return {
                    message: "No response received from the server. Please check your network connection."
                };
            } else {
                return { message: error.message || "An unexpected error occurred." };
            }
        } else {
            return { message: error.message || "An unexpected error occurred." };
        }
    }
}

export const updateUserRoleAndEnabledStatus = async (user: UserWithRoleAndEnabledStatus): Promise<string> => {
    const url = process.env.NEXT_PUBLIC_API_UPDATE_USER_ROLE_AND_ENABLE_STATUS;
    if (!url) {
        console.error("Environment variable 'NEXT_PUBLIC_DISABLED_USERS_API' is not defined.");
        throw new Error("API URL is undefined. Please check your environment variables.");
    }

    try {
        const response = await axioInstance.patch(url, user);
        return response.data.message;
    } catch (error: any) {
        console.log(error)
        if (axios.isAxiosError(error)) {
            if (error.response) {
                return error.response.data?.errorMessage || "An error occurred during updating user role and enabled status.";
            } else if (error.request) {
                return "No response received from the server. Please check your network connection.";
            } else {
                return error.message || "An unexpected error occurred.";
            }
        } else {
            return error.message || "An unexpected error occurred.";
        }
    }
}

export const deleteUser = async (userEmail: string): Promise<string> => {
    const url = process.env.NEXT_PUBLIC_API_DELETE_USER;
    if (!url) {
        console.error("Environment variable 'NEXT_PUBLIC_DISABLED_USERS_API' is not defined.");
        throw new Error("API URL is undefined. Please check your environment variables.");
    }

    try {
        const response = await axioInstance.delete(`${url}/${userEmail}`);
        return response.data.message;
    } catch (error: any) {
        console.log(error)
        if (axios.isAxiosError(error)) {
            if (error.response) {
                return error.response.data?.errorMessage || "An error occurred during deleting user.";
            } else if (error.request) {
                return "No response received from the server. Please check your network connection.";
            } else {
                return error.message || "An unexpected error occurred.";
            }
        } else {
            return error.message || "An unexpected error occurred.";
        }
    }
}