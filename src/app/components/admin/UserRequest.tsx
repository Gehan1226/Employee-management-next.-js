import React, { useState } from 'react'
import RequestCard from './RequestCard'
import ManageUserRequestPopup from './ManageUserRequestPopup';
import DeletePopup from '../DeletePopup';

type UserRequestProps = {
    disabledUsers: BasicUserInfo[];
}

export default function UserRequest({ disabledUsers }: Readonly<UserRequestProps>) {
    const [selectedUser, setSelectedUser] = useState<BasicUserInfo>();
    const [isShowUserRequestPopup, setIsShowUserRequestPopup] = useState(false);
    const [isShowDeletePopup, setIsShowDeletePopup] = useState(false);


    const handleUserRequestPopup = (value: boolean) => {
        setIsShowUserRequestPopup(value);
    }

    const handleAcceptUser = (user: BasicUserInfo) => {
        setSelectedUser(user);
    }

    const handleDeleteUser = (user: BasicUserInfo) => {
        setSelectedUser(user);
        setIsShowDeletePopup(true);

    }

    const onCloseDeletePopup = () => {
        setIsShowDeletePopup(false);
    }

    return (
        <>
            {isShowUserRequestPopup && selectedUser &&
                <ManageUserRequestPopup
                    handleUserRequestPopup={handleUserRequestPopup}
                    user={selectedUser}
                />
            }

            {isShowDeletePopup &&
                <DeletePopup
                    deleteItemName={selectedUser?.userName ?? ''}
                    closePopup={onCloseDeletePopup}
                />
            }

            {disabledUsers.map((user) => (
                <RequestCard
                    key={user.email}
                    handleUserRequestPopup={handleUserRequestPopup}
                    onPressAcceptUser={handleAcceptUser}
                    onPressDeleteUser={handleDeleteUser}
                    user={user}
                />
            ))}

        </>
    )
}
