"use client";
import React, { useEffect, useState } from 'react'
import RequestCard from './RequestCard'
import ManageUserRequestPopup from './ManageUserRequestPopup';
import { getDisabledUsers } from '@/app/api/auth';

export default function UserRequest() {

    const [isShowUserRequestPopup, setIsShowUserRequestPopup] = useState(false);
    const [disabledUsers, setDisabledUsers] = useState<BasicUserInfo[]>([]);

    useEffect(() => {
        const fetchDisabledUsers = async () => {
            const response = await getDisabledUsers();
            if (!response.message) {
                setDisabledUsers(response.data || []);
            }
        };
        fetchDisabledUsers();
    }, []);

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

            {disabledUsers.map((user) => (
                <RequestCard
                    key={user.email}

                    handleUserRequestPopup={handleUserRequestPopup}
                    user={user}
                />
            ))}

        </>
    )
}
