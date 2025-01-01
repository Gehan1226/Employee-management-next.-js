import axios from "axios";
import axioInstance from "../lib/axios";
import { RoleResponse } from "../types/response-types";

export const getRolesByDepartment = async (departmentId: string): Promise<Partial<RoleResponse>> => {
    try {
        const response = await axioInstance.get(`/role/get-by-department/${departmentId}`);
        return {success: true, data: response.data.data};        
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                return { message: error.response.data?.errorMessage || "An error occurred during fetching departments."};
            } else if (error.request) {
                return { message: "No response received from the server. Please check your network connection."};
            } else {
                return { message: error.message || "An unexpected error occurred."};
            }
        } else {
            return { message: error.message || "An unexpected error occurred."};
        }
    }
}