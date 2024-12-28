import { z } from "zod";

const userFormSchema = z.object({
    userName: z.string().min(1, "User name is required").max(50, "User name must be less than 50 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    repeatPassword: z.string().min(8, "Repeat password must be at least 8 characters"),
}).refine((data) => data.password === data.repeatPassword, {
    message: "Passwords must match",
    path: ["repeatPassword"],
});

export type UserFormSchemaType = z.infer<typeof userFormSchema>;

export function validateSingleField<Key extends keyof UserFormSchemaType>(
    key: Key,
    value: string
  ): { isValid: boolean; error: string | null } {

    const fieldSchema = userFormSchema.innerType().shape[key];
  
    try {
      fieldSchema.parse(value);
      return { isValid: true, error: null };
    } catch (error) {
      // Handle validation error
      if (error instanceof z.ZodError) {
        return { isValid: false, error: error.errors[0]?.message || "Invalid value" };
      }
      return { isValid: false, error: "Unexpected error" };
    }
  }