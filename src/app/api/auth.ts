"use server";
import { z } from "zod";

const userFormSchema = z.object({
    firstName: z.string().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
    lastName: z.string().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    repeatPassword: z.string().min(8, "Repeat password must be at least 8 characters"),
}).refine((data) => data.password === data.repeatPassword, {
    message: "Passwords must match",
    path: ["repeatPassword"],
});

const validateUserData = (data: Record<string, string>): UserValidateResponse => {
    try {
        const validatedData = userFormSchema.parse(data);
        return {
            success: true,
            data: validatedData,
            errors: null,
        };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                success: false,
                data: null,
                errors: error.flatten().fieldErrors,
            };
        }
        return {
            success: false,
            data: null,
            errors: { general: ["An unexpected error occurred"] },
        };
    }
};

export const registerUser = async (prevState: any, formData: FormData): Promise<AuthResponse> => {
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;
    const validatedData = validateUserData(data);

    if (validatedData.errors) {
        return {
            isSuccess: false,
            message: "User validate failed!",
            errors: validatedData.errors
        };
    }
    return {
        isSuccess: true,
        message: "User registered successfully",
        errors: null
    };
};