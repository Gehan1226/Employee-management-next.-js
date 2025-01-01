import { createInitialEmployee, Employee, RegisterEmployeeResponse } from "@/app/types/employee-types";
import { z } from "zod";

const employeeObjectSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    dob: z.date().min(new Date(1900, 1, 1), "Date of birth is required"),
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    district: z.string().min(1, "District is required"),
    city: z.string().min(1, "City is required"),
    street: z.string().min(1, "Street is required"),
    postalCode: z.string().min(1, "Postal Code is required"),
});

const handleEmployeeZodError = (error: z.ZodError): Employee => {
  const errorObject = createInitialEmployee();
  error.errors.forEach(obj => {
    const identifier = obj.path[0].toString();
    if (identifier in errorObject) {
      errorObject[identifier as keyof Employee] = obj.message;
    }
  });
  return errorObject;
}

export const validateEmployee = (data: Record<string, string>): RegisterEmployeeResponse => {
  try {
    employeeObjectSchema.parse(data);
    return { success: true };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return { success: false, validationErrors: handleEmployeeZodError(error) };
    }
    return { success: false};
  }
};