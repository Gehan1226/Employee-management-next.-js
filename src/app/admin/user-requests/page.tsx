"use client";
import { deleteUser, getDisabledUsers } from '@/app/api/auth';
import UserRequest from '@/app/components/admin/UserRequest'
import FilterIcon from '@/app/components/icons/FilterIcon';
import SortIcon from '@/app/components/icons/SortIcon';
import Paginations from '@/app/components/Paginations';
import SearchBar from '@/app/components/SearchBar'
import SuccessModal from '@/app/components/SuccessModal';
import { DeleteResponse } from '@/app/types/response-types';
import React, { useEffect, useState } from 'react'


export default function page() {
  const [disabledUsers, setDisabledUsers] = useState<BasicUserInfo[]>([]);
  const [responseState, setResponseState] = useState<DeleteResponse | null>(null);
  const [paginationData, setPaginationData] = useState<PaginationInfo>({ totalPages: 0, totalElements: 0, currentPage: 0 });

  useEffect(() => {
    const fetchDisabledUsers = async () => {
      const response = await getDisabledUsers(paginationData.currentPage);
      if (!response.message) {
        setDisabledUsers(response.data || []);
        setPaginationData({
          totalPages: response.totalPages ?? 0,
          totalElements: response.totalElements ?? 0,
          currentPage: response.currentPage ?? 0
        });
      }
    };
    fetchDisabledUsers();
  }, [responseState, paginationData.currentPage]);

  console.log(paginationData)

  const onDeleteUser = async (email: string) => {
    try {
      const response = await deleteUser(email);
      setResponseState({ message: response, success: true });
      console.log(response);
    } catch (error) {
      console.error("Error deleting user:", error);
      setResponseState({ message: (error as Error).message, success: false });
    }
  };

  const closeModal = () => {
    setResponseState(null);
  };

  const handlePageChange = (page: number) => {
    setPaginationData((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  return (
    <>

      {responseState &&
        <SuccessModal onClose={closeModal} />
      }

      <div className='bg-blue-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 shadow-md'>
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

          <Paginations
            currentPage={paginationData.currentPage}
            totalPages={paginationData.totalPages}
            handlePrev={() => handlePageChange(paginationData.currentPage - 1)}
            handleNext={() => handlePageChange(paginationData.currentPage + 1)}
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
