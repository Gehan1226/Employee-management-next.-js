import React from 'react'
import AuthInput from './AuthInput'

export default function UserLoginForm() {
    return (
        <form className="w-full p-7">

            <div className="mb-5">
                <AuthInput
                    label="Email address"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="example@gmail.com"
                    required
                    error={null}
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
                    minLength={8}
                    error={null}
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
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-3xl text-sm font-semibold px-20 py-3 text-center"
                >
                    Sign in
                </button>
            </div>

        </form>

    )
}
