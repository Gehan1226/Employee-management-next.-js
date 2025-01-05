"use client";
import React, { useEffect, useState } from 'react'
import RequestCard from './RequestCard'
import ManageUserRequestPopup from './ManageUserRequestPopup';
import { getDisabledUsers } from '@/app/api/auth';

export default function UserRequest() {

    const [isShowUserRequestPopup, setIsShowUserRequestPopup] = useState(false);
    const [disabledUsers, setDisabledUsers] = useState<BasicUserInfo[]>([]);
    const [selectedUser, setSelectedUser] = useState<BasicUserInfo>();

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

    const handleAcceptUser = (user: BasicUserInfo) => {
        setSelectedUser(user);
    }

    return (
        <>
            {isShowUserRequestPopup && selectedUser &&
                <ManageUserRequestPopup
                    handleUserRequestPopup={handleUserRequestPopup}
                    user={selectedUser}
                />
            }

            {disabledUsers.map((user) => (
                <RequestCard
                    key={user.email}
                    handleUserRequestPopup={handleUserRequestPopup}
                    onPressAcceptUser={handleAcceptUser}
                    user={user}
                />
            ))}

        </>
    )
}
