import { z } from "zod";

export const personalInfoSchema = z.object({
  firstName: z.string().min(3, "First name is should be at least 3 characters"),
  lastName: z.string().min(3, "Last name is should be at least 3 characters"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  dob: z.union([
    z.date({
      required_error: "Date of birth is required",
      invalid_type_error: "Please select a valid date",
    }),
    z.string().datetime(),
  ]),
  gender: z.string().min(4, "gender is required"),
  departmentId: z.string().min(1, "Department is required"),
  roleId: z.string().min(1, "Role is required"),
});

export const addressInfoSchema = z.object({
  country: z.string().min(1, "Country is required"),
  state: z.string().min(3, "State is should be at least 2 characters"),
  district: z.string().min(3, "District is should be at least 3 characters"),
  city: z.string().min(3, "City should be at least 3 characters"),
  street: z.string().min(3, "Street should be at least 3 characters"),
  postalCode: z.string().min(4, "Postal code is required"),
});

export const employeeFormSchema = z.object({
  step1: personalInfoSchema,
  step2: addressInfoSchema,
});
