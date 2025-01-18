type UserData = {
    userName: string;
    email: string;
    password: string;
    repeatPassword: string;
};

type AuthResponse = {
    success: boolean;
    data?: null;
    validationErrors?: UserData | null;  // validationErrors can be a string or a key-value pair for specific fields
    prevData?: Record<string, string>;
    backendErrors?: string;
    message?: string;
};

type BasicUserInfo  = {
    userName: string;
    email: string;
}

type BasicUserInfoResponse = {
    data: BasicUserInfo[];
    message: string;
    totalPages: number;
    totalElements: number;
    currentPage: number;
}

type UserWithRoleAndEnabledStatus = {
    userName: string;
    email: string;
    role: string;
    enabled: boolean;
}

type UserFilters = {
    startDate: string | null;
    endDate: string | null;
}