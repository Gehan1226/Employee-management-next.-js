"use client";
import React, { useState } from 'react'
import RequestCard from './RequestCard'
import ManageUserRequestPopup from './ManageUserRequestPopup';

export default function UserRequest() {

    const [isShowUserRequestPopup, setIsShowUserRequestPopup] = useState(false);

    const handleUserRequestPopup = (value: boolean) => {
        setIsShowUserRequestPopup(value);
    }

    return (
        <>
            {isShowUserRequestPopup &&
                <ManageUserRequestPopup
                    handleUserRequestPopup={handleUserRequestPopup}
                />
            }

            <div className="mt-5 w-full p-4 bg-blue-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 rounded-lg shadow-lg ">
                <RequestCard
                    handleUserRequestPopup={handleUserRequestPopup}
                />
            </div>
        </>
    )
}
