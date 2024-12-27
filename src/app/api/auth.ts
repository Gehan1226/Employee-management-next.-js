import { z } from "zod";
import instance from "../lib/axios";
import axios from "axios";

const userFormSchema = z.object({
    userName: z.string().min(1, "User name is required").max(50, "User name must be less than 50 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    repeatPassword: z.string().min(8, "Repeat password must be at least 8 characters"),
}).refine((data) => data.password === data.repeatPassword, {
    message: "Passwords must match",
    path: ["repeatPassword"],
});

const handleZodError = (error: z.ZodError): Record<string, string[] | undefined> => error.flatten().fieldErrors;

const validateUserData = (data: Record<string, string>): Partial<AuthResponse> => {
    try {
        const validatedData = userFormSchema.parse(data);
        return { success: true, data: validatedData, validationErrors: null };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { validationErrors: handleZodError(error) };
        }
        return { validationErrors: { general: ["An unexpected error occurred"] } };
    }
};

export const registerUser = async (prevState: any, formData: FormData): Promise<Partial<AuthResponse>> => {
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;

    try {
        const validatedData = validateUserData(data);

        if (validatedData.validationErrors) {
            return { prevData: data, ...validatedData };
        }
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
};