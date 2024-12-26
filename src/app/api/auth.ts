import { z } from "zod";
import instance from "../lib/axios";

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

const validateUserData = (data: Record<string, string>): AuthResponse => {
    try {
        const validatedData = userFormSchema.parse(data);
        return { success: true, data: validatedData, errors: null };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, data: null, errors: handleZodError(error) };
        }
        return { success: false, data: null, errors: { general: ["An unexpected error occurred"] } };
    }
};

export const registerUser = async (prevState: any, formData: FormData): Promise<AuthResponse> => {
    try {
        const data = Object.fromEntries(formData.entries()) as Record<string, string>;
        const validatedData = validateUserData(data);

        if (validatedData.errors) {
            return validatedData;
        }
        const { repeatPassword, ...filteredData } = data;
        const response = await instance.post("/user/register", filteredData);
        return response.data;
    } catch (error: any) {
        return { success: false, data: null, errors: error.response.data.errorMessage };
    }
};