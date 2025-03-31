import { z } from "zod";

export const userRegisterFormSchema = z.object({
    userName: z.string().min(4, "User name should be at least 4 characters").max(20, "User name must be less than 20 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    repeatPassword: z.string().min(8, "Repeat password must be at least 8 characters"),
}).refine((data) => data.password === data.repeatPassword, {
    message: "Passwords must match",
    path: ["repeatPassword"],
});