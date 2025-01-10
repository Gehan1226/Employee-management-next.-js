"use client";
import { deleteUser, getDisabledUsers } from '@/app/api/auth';
import UserRequest from '@/app/components/admin/UserRequest'
import FilterIcon from '@/app/components/icons/FilterIcon';
import SortIcon from '@/app/components/icons/SortIcon';
import SearchBar from '@/app/components/SearchBar'
import React, { useEffect, useState } from 'react'

export default function page() {
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

  const onDeleteUser = async (email: string) => {
    try {
      const response = await deleteUser(email);
      console.log(response);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>

      <div className=' bg-blue-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 shadow-md'>
        <p className='text-center p-5 font-semibold text-2xl mb-5'>Pending User Requests</p>
      </div>

      {disabledUsers.length > 0 ? (
        <>
          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-4">
              <SearchBar />
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none sm:w-auto shadow-md"
            >
              <SortIcon />
              Sort
            </button>

            <button
              type="button"
              className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none sm:w-auto shadow-md"
            >
              <FilterIcon />
              Filters
            </button>
          </div>

          <UserRequest
            disabledUsers={disabledUsers}
            handleDeleteUser={onDeleteUser}
          />
        </>
      ) : (
        <p className="text-center p-5 font-semibold text-2xl mt-5">
          Not Pending User request found....
        </p>
      )}

    </>
  )
}
