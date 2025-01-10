import React, { useState } from 'react'
import RequestCard from './RequestCard'
import ManageUserRequestPopup from './ManageUserRequestPopup';

type UserRequestProps = {
    disabledUsers: BasicUserInfo[];
}

export default function UserRequest({ disabledUsers }: Readonly<UserRequestProps>) {
    const [selectedUser, setSelectedUser] = useState<BasicUserInfo>();
    const [isShowUserRequestPopup, setIsShowUserRequestPopup] = useState(false);


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
