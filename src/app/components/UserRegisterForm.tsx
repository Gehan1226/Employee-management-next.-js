"use client";
import React, { useActionState, useState } from 'react'
import AuthInput from './AuthInput';
import { registerUser } from '../api/auth';
import ResponseStateAlert from './ResponseStateAlert';

const initialState: AuthResponse = {
    success: false,
    data: null,
    validationErrors: null,
    backendErrors: null,
    prevData: null,
}

export default function UserRegisterForm() {
    const [showAlert, setShowAlert] = useState(true);
    const [state, formAction, isPending] = useActionState(registerUser, initialState);

    const closeAlert = () => {
        setShowAlert(false);
    }

    return (
        <>
            {state.backendErrors && showAlert &&
                <ResponseStateAlert
                    state="ERROR"
                    message="User register failed!"
                    description={state.backendErrors}
                    onClose={closeAlert}
                />
            }

            <form action={formAction} className="w-full mx-auto p-7">

                <div className="mb-5">
                    <AuthInput
                        label="User name"
                        id="user-name"
                        type="text"
                        name="userName"
                        placeholder="Doe"
                        defaultValue={state.prevData?.userName ?? ''}
                        required
                        error={state.validationErrors?.lastName?.[0] ?? null}
                    />
                </div>

                <div className="mb-5">
                    <AuthInput
                        label="Email address"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="example@gmail.com"
                        defaultValue={state.prevData?.email ?? ''}
                        required
                        error={state.validationErrors?.email?.[0] ?? null}
                    />
                </div>

                <div className="mb-5">
                    <AuthInput
                        label="Password"
                        id="password"
                        type="password"
                        name="password"
                        placeholder="●●●●●●●●●●"
                        defaultValue={state.prevData?.password ?? ''}
                        required
                        minLength={8}
                        error={state.validationErrors?.password?.[0] ?? null}
                    />
                </div>

                <div className="mb-5">
                    <AuthInput
                        label="Repeat password"
                        id="repeat-password"
                        type="password"
                        name="repeatPassword"
                        defaultValue={state.prevData?.repeatPassword ?? ''}
                        placeholder="●●●●●●●●●●"
                        required
                        minLength={8}
                        error={state.validationErrors?.repeatPassword?.[0] ?? null}
                    />
                </div>

                <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                        <input
                            id="terms"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                            required
                        />
                    </div>
                    <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        I agree with the{' '}
                        <button type="button" className="text-blue-600 hover:underline dark:text-blue-500">
                            terms and conditions
                        </button>
                    </label>
                </div>

                <div className="flex flex-row-reverse">
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-3xl text-sm font-semibold px-5 py-3 text-center"
                    >
                        Sign up
                    </button>
                </div>

            </form>

        </>
    )
}