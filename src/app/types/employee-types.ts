export type Employee = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dob: string;
    country: string;
    state: string;
    district: string;
    city: string;
    street: string;
    postalCode: string;
};

export type RegisterEmployeeResponse = {
    success: boolean;
    data?: Employee;
    validationErrors?: Employee;
    message?: string;
    prevData?: Record<string, string>;
};
