import { validateEmployee } from "../lib/util/employee-schemas";
import { RegisterEmployeeResponse } from "../types/employee-types";

export const registerEmployee = async (prevState: any, formData: FormData): Promise<RegisterEmployeeResponse> => {
    const employeeData = Object.fromEntries(formData.entries()) as Record<string, string>;
    const validatedData = validateEmployee(employeeData);

    if (validatedData.validationErrors) {
        return { prevData: employeeData, ...validatedData };
    }

    return {
        success: true,
        data: undefined,
        validationErrors: undefined,
        message: ""
    };
};
