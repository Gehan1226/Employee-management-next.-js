import React from 'react'
import Image from 'next/image'

type RequestCardProps = {
    handleUserRequestPopup: (value: boolean) => void
}

export default function RequestCard({ handleUserRequestPopup }: Readonly<RequestCardProps>) {
    return (
        <div className='flex flex-col justify-between sm:flex-row gap-5'>
            <div className='flex flex-col items-center sm:flex-row'>
                <Image
                    className="w-16 h-16 rounded-full mt-2"
                    src="/user-placeholder.png"
                    alt="user placeholder image"
                    width={64}
                    height={64}
                />

                <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Example user
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        example@gmail.com
                    </p>
                </div>

            </div>

            <div className='flex items-center font-semibold text-center'>
                <p>Request at: {new Date().toDateString()} </p>
            </div>

            <div className='flex flex-row justify-center gap-3 sm:items-center'>
                <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                    onClick={() => handleUserRequestPopup(true)}
                >
                    Accept
                </button>

                <button
                    type="button"
                    className="text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}
