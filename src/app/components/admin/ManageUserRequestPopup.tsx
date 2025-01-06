import React from 'react'
import DropDownMenu from '../DropDownMenu'
import Image from 'next/image'

type ManageUserRequestPopupProps = {
  handleUserRequestPopup: (value: boolean) => void;
  user: BasicUserInfo;
}

export default function ManageUserRequestPopup({ handleUserRequestPopup, user }: Readonly<ManageUserRequestPopupProps>) {
  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-gray-500 bg-opacity-75 p-5">
      <div className="relative w-full h-fit max-w-2xl rounded-lg bg-white shadow-lg z-50 flex flex-col">

        <h3 className="text-lg font-semibold text-center p-4 border-b border-gray-200 rounded-t">Manage user request</h3>

        <button
          type="button"
          className="absolute top-2 right-2 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={() => handleUserRequestPopup(false)}
        >
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>

        <div className='flex flex-col sm:flex-row items-center mt-5 mx-auto gap-3 shadow-md rounded-md p-3'>

          <Image
            className="w-16 h-16 mt-2"
            src="/user-placeholder.png"
            alt="user placeholder image"
            width={64}
            height={64}
          />

          <div className='flex flex-col font-normal'>
            <p>User-name: <span className='font-semibold'>{user.userName}</span></p>
            <p>Email:  <span className='font-semibold'>{user.email}</span></p>
          </div>

        </div>

        <div className='flex flex-col justify-between p-5 gap-5 mt-5 sm:flex-row'>
          <DropDownMenu
            label="User role"
            menuItems={[
              { label: "User", id: 'USER' },
              { label: "Manager", id: "MANAGER" },
              { label: "Admin", id: "ADMIN" }
            ]}
            name="role"
          />

          <DropDownMenu
            label="Status"
            menuItems={[
              { label: "Enable", id: 'USER' },
              { label: "Disable", id: "MANAGER" }
            ]}
            name="enabled"
          />

        </div>

        <div className='flex flex-row justify-end border border-t-gray-200 p-3 mt-5 rounded-b-lg gap-3'>

          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Confirm
          </button>

          <button
            type="button"
            className="text-white bg-gray-400 hover:bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={() => handleUserRequestPopup(false)}
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  )
}
