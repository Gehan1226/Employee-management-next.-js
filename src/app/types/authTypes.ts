type AuthResponse = {
    isSuccess: boolean;
    message: string;
    errors: Record<string, string[] | undefined> | null;
};

type UserValidatedData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword: string;
};

type UserValidateResponse = {
    success: boolean;
    data: UserValidatedData | null;
    errors: Record<string, string[] | undefined> | null;
}