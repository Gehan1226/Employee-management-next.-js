"use server";
import { z } from "zod";

const employeeObjectSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    district: z.string().min(1, "District is required"),
    city: z.string().min(1, "City is required"),
    street: z.string().min(1, "Street is required"),
    postalCode: z.string().min(1, "Postal Code is required"),
});

export const registerEmployee = async (formData: FormData) => {
    const employeeData = Object.fromEntries(formData.entries());
    console.log(employeeData)
    const validatedFields = employeeObjectSchema.safeParse(employeeData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }
};
