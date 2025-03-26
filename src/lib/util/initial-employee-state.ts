import { Employee, RegisterEmployeeResponse } from "@/app/types/employee-types";

export const createInitialEmployee = (): Employee => ({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dob: '',
    gender: '',
    department: '',
    role: '',
    country: '',
    state: '',
    district: '',
    city: '',
    street: '',
    postalCode: '',
});

export const createInitialRegisterEmployeeResponse = (): RegisterEmployeeResponse => ({
    success: false,
    message: ""
});