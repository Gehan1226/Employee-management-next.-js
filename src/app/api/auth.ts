import instance from "../lib/axios";
import axios from "axios";
import { validateUserData } from "../lib/util/schemas";


export const registerUser = async (prevState: any, formData: FormData): Promise<Partial<AuthResponse>> => {
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;

    console.log(data)
    const validatedData = validateUserData(data);

    if (validatedData.validationErrors) {
        return {prevData: data, ...validatedData};
    }

    try {
        const { repeatPassword, ...filteredData } = data;
        const response = await instance.post("/user/register", filteredData);
        return response.data;
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





    // try {
    //     if (validatedData.errors) {
    //         return validatedData;
    //     }
    //     const { repeatPassword, ...filteredData } = data;
    //     const response = await instance.post("/user/register", filteredData);
    //     return response.data;
    // } catch (error: any) {
    // if (axios.isAxiosError(error)) {
    //     if (error.response) {
    //         return {
    //             backendErrors: error.response.data?.errorMessage || "An error occurred during registration", prevData: data
    //         };
    //     } else if (error.request) {
    //         return {
    //             backendErrors: "No response received from the server. Please check your network connection.", prevData: data
    //         };
    //     } else {
    //         return { backendErrors: error.message || "An unexpected error occurred.", prevData: data };
    //     }
    // } else {
    //     return { backendErrors: error.message || "An unexpected error occurred.", prevData: data };
    // }
    // }
};