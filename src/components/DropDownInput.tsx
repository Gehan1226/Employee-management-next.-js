import React from 'react'

type DropDownInputProps = {
    label: string; // The label for the dropdown
    name: string;  // The name attribute for form submission
    id: string;    // The id attribute for accessibility
    options: Array<{ label: string; value: string }>; // Dropdown options
};

export default function DropDownInput({ label, name, id, options }: Readonly<DropDownInputProps>) {
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-semibold text-gray-800 mb-2 ms-3"
            >
                {label}
            </label>
            <select
                className="rounded-3xl block w-full border-gray-300 text-gray-900 bg-sky-100 focus:ring-blue-500 focus:border-blue-500"
                name={name}
                id={id}
            >
                {options.map((option: any) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
