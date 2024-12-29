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
  };
