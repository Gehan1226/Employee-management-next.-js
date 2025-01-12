import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    error?: string;
}

export default function Input({ label, id, error, ...props }: Readonly<InputProps>) {
    return (
        <div className="relative z-0 w-full mb-5 group">
            <input
                id={id}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer border-gray-300 focus:border-blue-600"
                placeholder=" "
                {...props}
            />
            <label
                htmlFor={id}
                className="peer-focus:font-medium absolute text-sm duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-gray-500 peer-focus:text-blue-600"
            >
                {label}
            </label>

            {error && <p className="mt-2  text-sm text-red-600">*{error}</p>}

        </div>
    )
}