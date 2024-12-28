export const createInitialUserData = (): UserData => ({
    userName: '',
    email: '',
    password: '',
    repeatPassword: '',
});

export const createInitialAuthResponse = (): AuthResponse => ({
    success: false,
    data: null,
    validationErrors: null,
    backendErrors: null,
    prevData: null,
});