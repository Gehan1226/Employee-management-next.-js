import instance from "../lib/axios";
import axios from "axios";
import { validateUserData } from "../lib/util/user-schemas";


export const registerUser = async (prevState: any, formData: FormData): Promise<Partial<AuthResponse>> => {
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;
    const validatedData = validateUserData(data, "Register");

    if (validatedData.validationErrors) {
        return { prevData: data, ...validatedData };
    }

    try {
        const { repeatPassword, ...filteredData } = data;
        const response = await instance.post("/user/register", filteredData);
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
        const response = await instance.post("/user/login", filteredData);
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