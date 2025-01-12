import React, { useState } from 'react'
import RequestCard from './RequestCard'
import ManageUserRequestPopup from './ManageUserRequestPopup';
import DeletePopup from '../DeletePopup';

type UserRequestProps = {
    disabledUsers: BasicUserInfo[];
    handleDeleteUser: (email: string) => void
}

export default function UserRequest({ disabledUsers, handleDeleteUser }: Readonly<UserRequestProps>) {
    const [selectedUser, setSelectedUser] = useState<BasicUserInfo>();
    const [isShowUserRequestPopup, setIsShowUserRequestPopup] = useState(false);
    const [isShowDeletePopup, setIsShowDeletePopup] = useState(false);

    const handleUserRequestPopup = (value: boolean) => {
        setIsShowUserRequestPopup(value);
    }

    const handleAcceptUser = (user: BasicUserInfo) => {
        setSelectedUser(user);
    }

    const activateDeletePopup = (user: BasicUserInfo) => {
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
                    user={selectedUser}
                    closePopup={onCloseDeletePopup}
                    onDelete={handleDeleteUser}
                />
            }

            <div className="max-h-[520px] overflow-y-auto px-5 py-3 mt-5 scrollbar-thin scrollbar-thumb-sky-600 scrollbar-track-gray-200">
                {disabledUsers.map((user) => (
                    <RequestCard
                        key={user.email}
                        handleUserRequestPopup={handleUserRequestPopup}
                        onPressAcceptUser={handleAcceptUser}
                        onPressDeleteUser={activateDeletePopup}
                        user={user}
                    />
                ))}
            </div>


        </>
    )
}
