import clsx from 'clsx';
import React from 'react'

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    error: string | null | undefined;
}

export default function AuthInput({ label, id, error, ...props }: Readonly<AuthInputProps>) {
    return (
        <>
            <label
                htmlFor={id}
                className="block mb-2 ms-3 text-sm font-medium text-gray-900"

            >
                {label}
            </label>
            <input
                className={clsx(
                    "shadow-sm border text-sm rounded-3xl block w-full p-3 text-gray-900",
                    {
                        "bg-sky-100 border-gray-300 focus:ring-blue-500 focus:border-blue-500": !error,
                        "bg-red-100 border-red-500 focus:ring-red-700 focus:border-red-700": error
                    }
                )}
                {...props}
            />

            {error &&
                <p className="mt-2 ms-2 text-sm text-red-600 dark:text-red-500">*{error}</p>
            }

        </>
    )
}
