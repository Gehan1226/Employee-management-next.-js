"use client";
import { userLogin } from '@/app/api/auth';
import { createInitialAuthResponse } from '@/app/lib/util/initial-user-state';
import React, { useActionState, useEffect, useState } from 'react'
import ResponseStateAlert from '../ResponseStateAlert';
import AuthInput from './AuthInput';
import LoadingButton from '../LoadingButton';

export default function UserLoginForm() {
    const [showAlert, setShowAlert] = useState(false);
    const [state, formAction, isPending] = useActionState(userLogin, createInitialAuthResponse());

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
                    message="User Login failed!"
                    description={state.backendErrors}
                    onClose={closeAlert}
                />
            }
            {state.success && showAlert &&
                <ResponseStateAlert
                    state="SUCCESS"
                    message={state.message ?? "User login successfully!"}
                    description="Explore your dashboard."
                    onClose={closeAlert}
                />
            }

            <form action={formAction} className="w-full p-7">

                <div className="mb-5">
                    <AuthInput
                        label="User name"
                        id="user-name"
                        type="text"
                        name="userName"
                        placeholder="john"
                        required
                        defaultValue={state.prevData?.['userName']}
                        error={state.validationErrors?.userName}
                    />
                </div>

                <div className="mb-5">
                    <AuthInput
                        label="Password"
                        id="password"
                        type="password"
                        name="password"
                        placeholder="●●●●●●●●●●"
                        required
                        defaultValue={state.prevData?.['password']}
                        error={state.validationErrors?.password}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                        </div>
                    </div>
                    <button type="button" className="text-sm font-semibold text-sky-600 hover:underline dark:text-primary-500">Forgot password?</button>
                </div>

                <div className="flex justify-center mt-5">
                    {!isPending ? (
                        < button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-3xl text-sm font-semibold px-20 py-3 text-center"
                        >
                            Sign in
                        </button>
                    ) : (
                        <LoadingButton />
                    )}
                </div>

            </form >
        </>

    )
}
