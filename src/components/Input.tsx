import clsx from "clsx";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

export default function Input({
  label,
  id,
  error,
  ...props
}: Readonly<InputProps>) {
  return (
    <div className="relative z-0 w-full  group">
      <div>
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <input
          type="text"
          id={id}
          className={clsx(
            "bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5",
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          )}
          {...props}
        />
      </div>

      {error && <p className="mt-2 text-sm text-red-600">*{error}</p>}
    </div>
  );
}
