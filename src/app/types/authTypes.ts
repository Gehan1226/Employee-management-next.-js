type UserData = {
    userName: string;
    email: string;
    password: string;
    repeatPassword: string;
};

type AuthResponse = {
    success: boolean;
    data: UserData | null;
    validationErrors: Record<string, string[] | undefined> | null;
    backendErrors: string | null;
    prevData: null | Record<string, string>;
}

