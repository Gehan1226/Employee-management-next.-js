export type UserData = {
    userName: string;
    email: string;
    password: string;
    repeatPassword: string;
};

export type AuthResponse = {
    success: boolean;
    data?: null;
    validationErrors?: UserData | null;  // validationErrors can be a string or a key-value pair for specific fields
    prevData?: Record<string, string>;
    backendErrors?: string;
    message?: string;
};

export type BasicUserInfo  = {
    userName: string;
    email: string;
}

export type BasicUserInfoResponse = {
    data: BasicUserInfo[];
    message: string;
    totalPages: number;
    totalElements: number;
    currentPage: number;
}

export type UserWithRoleAndEnabledStatus = {
    userName: string;
    email: string;
    role: string;
    enabled: boolean;
}

export type UserFilters = {
    startDate: string | null;
    endDate: string | null;
    searchTerm: string | null;
}