import React from 'react'
import SuccessIcon from './icons/SuccessIcon';
import ErrorIcon from './icons/ErrorIcon';

type ResponseStateAlertProps = {
    state: "SUCCESS" | "ERROR" | "WARNING" | "INFO";
    message: string;
    description: string;
    onClose: () => void;
}

export default function ResponseStateAlert({ state, message, description, onClose }: Readonly<ResponseStateAlertProps>) {
    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40  backdrop-blur-sm">
            <div className="flex flex-col gap-2 text-[10px] sm:text-xs mt-4">
                <div className="cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#292b39] px-[10px] shadow-black shadow-lg">
                    <div className="flex gap-2">

                        {state === "SUCCESS" && <SuccessIcon />}
                        {state === "ERROR" && <ErrorIcon />}
                        <div>
                            <p className="text-white">{message}</p>
                            <p className="text-gray-500">{description}</p>
                        </div>
                    </div>
                    <button
                        className="text-gray-600 hover:bg-white/5 p-1 rounded-md transition-colors ease-linear"
                        onClick={onClose}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
