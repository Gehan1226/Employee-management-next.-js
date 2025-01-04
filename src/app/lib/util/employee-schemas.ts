import { Employee, RegisterEmployeeResponse, ValidatedEmployee } from "@/app/types/employee-types";
import { z } from "zod";
import { createInitialEmployee } from "./initial-employee-state";

const employeeObjectSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  dob: z
    .string()
    .transform((str) => new Date(str))
    .refine(
      (date) => !isNaN(date.getTime()) && date >= new Date(1900, 0, 1),
      "Date of birth must be a valid date on or after January 1, 1900"
    ),
  gender: z.preprocess(
    (val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
    z.enum(["Male", "Female", "Other"], {
      errorMap: () => ({ message: "Gender is required or invalid" }),
    })
  ),
  department: z.string().min(1, "Department is required"),
  role: z.string().min(1, "Role is required"),
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

export const validateEmployee = (data: Record<string, string>): ValidatedEmployee => {
  try {
    employeeObjectSchema.parse(data);
    return { success: true };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return { success: false, validationErrors: handleEmployeeZodError(error) };
    }
    return { success: false };
  }
};