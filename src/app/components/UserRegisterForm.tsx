"use client";
import React, { useActionState, useEffect, useState } from 'react'
import AuthInput from './AuthInput';
import { registerUser } from '../api/auth';
import ResponseStateAlert from './ResponseStateAlert';
import { createInitialAuthResponse } from '../lib/util/initial-user-state';
import DropDownInput from './DropDownInput';
import LoadingButton from './LoadingButton';

 
export default function UserRegisterForm() {
    const [showAlert, setShowAlert] = useState(false);
    const [state, formAction, isPending] = useActionState(registerUser, createInitialAuthResponse());

    useEffect(() => {
        if (state.backendErrors || state.success) {
            setShowAlert(true);
        } 
    }, [state]);

    const closeAlert = () => {
        setShowAlert(false);
    };

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
            {state.success && showAlert &&
                <ResponseStateAlert
                    state="SUCCESS"
                    message={state.message ?? "User registered successfully!"}
                    description="Please wait for admin approval."
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
                        defaultValue={state.prevData?.['userName']}
                        error={state.validationErrors?.userName}
                    />
                </div>

                <div className="mb-5">
                    <AuthInput
                        label="Email address"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="example@gmail.com"
                        defaultValue={state.prevData?.['email']}
                        error={state.validationErrors?.email}
                    />
                </div>

                <div className="mb-5">
                    <AuthInput
                        label="Password"
                        id="password"
                        type="password"
                        name="password"
                        placeholder="●●●●●●●●●●"
                        defaultValue={state.prevData?.['password']}
                        error={state.validationErrors?.password}
                    />
                </div>

                <div className="mb-5">
                    <AuthInput
                        label="Repeat password"
                        id="repeat-password"
                        type="password"
                        name="repeatPassword"
                        placeholder="●●●●●●●●●●"
                        defaultValue={state.prevData?.['repeatPassword']}
                        error={state.validationErrors?.repeatPassword}
                    />
                </div>

                <div className="mb-5">
                    <DropDownInput
                        label="Select a role"
                        id="role"
                        name="role"
                        options={[
                            { label: 'User', value: 'USER' },
                            { label: 'Admin', value: 'ADMIN' },
                            { label: 'Super Admin', value: 'SUPER_ADMIN' },
                        ]}
                    />
                </div>

                <div className="flex items-start mb-5 ms-2">
                    <div className="flex items-center h-5">
                        <input
                            id="terms"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
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
                    {!isPending &&
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-3xl text-sm font-semibold px-10 py-3 text-center"
                        >
                            Sign up
                        </button>
                    }

                    {isPending &&
                        <LoadingButton />
                    }
                </div>

            </form>

        </>
    )
}