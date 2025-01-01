export type CountryDetails = {
    name: string;
    flag: string;
};

export type CountryDetailsResponse = {
    success: boolean;
    data?: CountryDetails[];
    message?: string;
};

export type Department = {
    id: number;
    name: string;
}

export type DepartmentResponse = {
    success: boolean;
    data: Department[];
    message: string;
};

export type Role = {
    id: number;
    name: string;
};

export type RoleResponse = {
    success: boolean;
    data: Role[];
    message: string;
};
