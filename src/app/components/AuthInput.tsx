import React from 'react'

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
}

export default function AuthInput({ label, id, ...props}: Readonly<AuthInputProps>) {
    return (
        <>
            <label htmlFor={id} className="block mb-2 ms-3 text-sm font-medium text-gray-900">
                {label}
            </label>
            <input
                className="shadow-sm bg-sky-100 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                {...props}
            />
        </>
    )
}
