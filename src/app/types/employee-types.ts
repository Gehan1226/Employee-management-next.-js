export type Employee = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dob: Date | string;
    country: string;
    state: string;
    district: string;
    city: string;
    street: string;
    postalCode: string;
};

export const createInitialEmployee = (): Employee => ({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dob: new Date(),
    country: '',
    state: '',
    district: '',
    city: '',
    street: '',
    postalCode: '',
});

export type RegisterEmployeeResponse = {
    success: boolean;
    data?: Employee;
    validationErrors?: Employee;
    message?: string;
};

