import React from 'react'

export default function GoogleLogin() {
    return (
        <div className="w-full flex justify-center mt-5">
            <button
                className="group w-1/2 h-12 px-6 border-2 border-gray-300 rounded-full hover:border-sky-300 focus:bg-blue-50 active:bg-blue-100">
                <div className="relative flex items-center space-x-4 justify-center">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg"
                        className="absolute left-0 w-5" alt="google logo" />
                    <span
                        className="block w-max font-semibold tracking-wide text-gray-700 dark:text-white text-sm sm:text-base">Continue
                        with Google
                    </span>
                </div>
            </button>
        </div>
    )
}
