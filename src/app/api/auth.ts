"use server";

export const registerUser = async (prevState: any, formData: FormData): Promise<AuthResponse>  => {

    return {
        state: "true",
        message: "User registered successfully"
    };
};