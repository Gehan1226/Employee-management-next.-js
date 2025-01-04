import axios from "axios";
import axioInstance from "../lib/axios";
import { validateEmployee } from "../lib/util/employee-schemas";
import { RegisterEmployeeResponse } from "../types/employee-types";

export const registerEmployee = async (prevState: any, formData: FormData): Promise<Partial<RegisterEmployeeResponse>> => {
    const employeeData = Object.fromEntries(formData.entries()) as Record<string, string>;
    const validatedData = validateEmployee(employeeData);

    if (validatedData.validationErrors) {
        return { prevData: employeeData, ...validatedData };
    }

    const [month, day, year] = employeeData.dob.split("/").map(Number);
    employeeData.dob = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    try {
        const response = await axioInstance.post("/api/v1/employee/add", employeeData);
        return { success: true, message: response.data.message };
    } catch (error: any) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            if (error.response) {
                return {
                    backendErrors: error.response.data?.errorMessage || "An error occurred during registration",
                    prevData: employeeData
                };
            } else if (error.request) {
                return {
                    backendErrors: "No response received from the server. Please check your network connection.",
                    prevData: employeeData
                };
            } else {
                return { backendErrors: error.message || "An unexpected error occurred.", prevData: employeeData };
            }
        } else {
            return { backendErrors: error.message || "An unexpected error occurred.", prevData: employeeData };
        }
    }
};
