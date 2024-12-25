"use client";
import React, { useActionState } from 'react'
import AuthInput from './AuthInput';
import { registerUser } from '../api/auth';

const initialState: AuthResponse = {
    isSuccess: false,
    message: '',
    errors: null
}

export default function UserRegisterForm() {
    const [state, formAction, isPending] = useActionState(registerUser, initialState);

    return (
        <form action={formAction} className="w-full mx-auto p-7">

            <div className="flex flex-row w-full space-x-5">
                <div className="w-1/2 mb-5">
                    <AuthInput
                        label="First name"
                        id="first-name"
                        type="text"
                        name="firstName"
                        placeholder="John"
                    />
                </div>
                <div className="w-1/2 mb-5">
                    <AuthInput
                        label="Last name"
                        id="last-name"
                        type="text"
                        name="lastName"
                        placeholder="Doe"
                    />
                </div>
            </div>

            <div className="mb-5">
                <AuthInput
                    label="Email address"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="example@gmail.com"
                />
            </div>

            <div className="mb-5">
                <AuthInput
                    label="Password"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="●●●●●●●●●●"
                />
            </div>

            <div className="mb-5">
                <AuthInput
                    label="Repeat password"
                    id="repeat-password"
                    type="password"
                    name="repeatPassword"
                    placeholder="●●●●●●●●●●"
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
    )
}