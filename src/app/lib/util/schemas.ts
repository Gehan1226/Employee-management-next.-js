import { z } from "zod";
import { createInitialUserData } from "./initial-user-state";

export const userFormSchema = z.object({
  userName: z.string().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  repeatPassword: z.string().min(8, "Repeat password must be at least 8 characters"),
}).refine((data) => data.password === data.repeatPassword, {
  message: "Passwords must match",
  path: ["repeatPassword"],
});

const handleZodError = (error: z.ZodError): UserData => {
  const errorObject = createInitialUserData();
  error.errors.forEach(obj => {
    const identifier = obj.path[0].toString();
    if (identifier in errorObject) {
      errorObject[identifier as keyof UserData] = obj.message;
    }
  });
  return errorObject;
}

export const validateUserData = (data: Record<string, string>): AuthResponse => {
  try {
    userFormSchema.parse(data);
    return { success: true };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      handleZodError(error)
      return { success: false, validationErrors: handleZodError(error) };
    }
    return { success: false, validationErrors: null };
  }
};