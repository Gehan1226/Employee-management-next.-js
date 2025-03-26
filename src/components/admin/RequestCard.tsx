import React from 'react'
import Image from 'next/image'

type RequestCardProps = {
    handleUserRequestPopup: (value: boolean) => void;
    onPressAcceptUser: (user: BasicUserInfo) => void;
    onPressDeleteUser: (user: BasicUserInfo) => void;
    user: BasicUserInfo;
}

export default function RequestCard({ handleUserRequestPopup, user, onPressAcceptUser, onPressDeleteUser }: Readonly<RequestCardProps>) {
    return (
        <div className="relative overflow-hidden w-full p-4 mt-5 bg-slate-200 rounded-lg shadow-md mb-3">
            <div className="absolute left-0 top-0 h-12 w-12">
                <div
                    className="absolute transform -rotate-45 bg-sky-600 text-center text-white font-semibold right-[-55px] top-[32px] w-[170px]">
                   &nbsp;&nbsp;&nbsp;&nbsp; User
                </div>
            </div>

            <div className='flex flex-col justify-between sm:flex-row gap-5 ml-7'>
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
                            {user.userName}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {user.email}
                        </p>
                    </div>

                </div>

                <div className='flex items-center font-normal text-center'>
                    <p>Date: {new Date().toDateString()} </p>
                </div>

                <div className='flex flex-row justify-center gap-3 sm:items-center'>
                    <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                        onClick={() => {
                            onPressAcceptUser(user);
                            handleUserRequestPopup(true);
                        }}
                    >
                        Accept
                    </button>

                    <button
                        type="button"
                        className="text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5"
                        onClick={() => {
                            onPressDeleteUser(user);
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}
