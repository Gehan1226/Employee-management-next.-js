type UserValidatedData = {
    userName: string;
    email: string;
    password: string;
    repeatPassword: string;
};

type AuthResponse = {
    success: boolean;
    data: UserValidatedData | null;
    errors: Record<string, string[] | undefined> | null;
}