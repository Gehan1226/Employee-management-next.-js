"use client";
import React, { useActionState, useEffect, useState } from 'react'
import AuthInput from './AuthInput';
import { registerUser } from '../api/auth';
import ResponseStateAlert from './ResponseStateAlert';
import { createInitialAuthResponse } from '../lib/util/initial-user-state';


export default function UserRegisterForm() {
    const [showAlert, setShowAlert] = useState(false);
    const [state, formAction, isPending] = useActionState(registerUser, createInitialAuthResponse());

    useEffect(() => {
        if(state.backendErrors){
            setShowAlert(true);
        }
    }, [state]);

    const closeAlert = () => {
        setShowAlert(false);
    };

    return (
        <>
            {showAlert &&
                <ResponseStateAlert
                    state="ERROR"
                    message="User register failed!"
                    description={state.backendErrors ?? 'Unknown error occured !'}
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

                <div className="flex items-start mb-5">
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
                        <button
                            disabled
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-3xl text-sm px-10 py-3 text-center"
                        >
                            <svg
                                aria-hidden="true"
                                className="inline w-4 h-4 me-3 text-white animate-spin"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>
                            <output>Loading...</output>
                        </button>
                    }
                </div>



            </form>

        </>
    )
}