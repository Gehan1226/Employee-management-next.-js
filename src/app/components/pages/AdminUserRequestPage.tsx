"use client";
import { deleteUser, getDisabledUsers } from "@/app/api/auth";
import UserRequest from "@/app/components/admin/UserRequest";
import UserRequestFilter from "@/app/components/admin/UserRequestFilter";
import FilterIcon from "@/app/components/icons/FilterIcon";
import NotificationIcon from "@/app/components/icons/NotificationIcon";
import SortIcon from "@/app/components/icons/SortIcon";
import Paginations from "@/app/components/Paginations";
import SearchBar from "@/app/components/SearchBar";
import SuccessModal from "@/app/components/SuccessModal";
import { userFilterInitials } from "@/app/lib/util/admin-initials";
import { DeleteResponse } from "@/app/types/response-types";
import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function AdminUserRequestPage() {
  const [disabledUsers, setDisabledUsers] = useState<BasicUserInfo[]>([]);
  const [responseState, setResponseState] = useState<DeleteResponse | null>(
    null
  );
  const [paginationData, setPaginationData] = useState<PaginationInfo>({
    totalPages: 0,
    totalElements: 0,
    currentPage: 0,
  });
  const [isOpenUserFilterPopup, setIsOpenUserFilterPopup] = useState(false);
  const [filterData, setFilterData] = useState<UserFilters>(userFilterInitials);

  useEffect(() => {
    const fetchDisabledUsers = async () => {
      const response = await getDisabledUsers(
        paginationData.currentPage,
        filterData.startDate,
        filterData.endDate,
        filterData.searchTerm
      );
      if (!response.message) {
        setDisabledUsers(response.data || []);
        setPaginationData({
          totalPages: response.totalPages ?? 0,
          totalElements: response.totalElements ?? 0,
          currentPage: response.currentPage ?? 0,
        });
      }
    };
    fetchDisabledUsers();
  }, [
    responseState,
    paginationData.currentPage,
    filterData.startDate,
    filterData.endDate,
    filterData.searchTerm,
  ]);

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

  const updateFilters = (filters: UserFilters) => {
    setFilterData(filters);
  };

  const handleSearch = useDebouncedCallback((searchTerm: string) => {
    setFilterData((prev) => ({
      ...prev,
      searchTerm,
    }));
  }, 300);

  return (
    <>
      {responseState && <SuccessModal onClose={closeModal} />}

      {isOpenUserFilterPopup && (
        <UserRequestFilter
          onClose={() => setIsOpenUserFilterPopup(false)}
          updateFilters={updateFilters}
        />
      )}

      <div className="bg-blue-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 shadow-md">
        <p className="text-center p-5 font-semibold text-2xl mb-5">
          Pending User Requests
        </p>
      </div>

      <>
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-4">
            <SearchBar placeholder="Search Users..." onSearch={handleSearch} />
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
            onClick={() => setIsOpenUserFilterPopup(true)}
          >
            <FilterIcon />
            Filters
          </button>
        </div>

        <div className="flex mt-4 ml-4 gap-4">
          <p className="font-semibold bg-gray-300 px-5 py-1 rounded-sm shadow-sm relative">
            <NotificationIcon className="absolute -top-1 right-0 w-4 h-4" />
            Total requests: {paginationData.totalElements}
          </p>

          {filterData.startDate && (
            <p className="font-semibold bg-gray-300 px-5 py-1 rounded-sm shadow-sm relative">
              Filters Applied
            </p>
          )}
        </div>

        {disabledUsers.length > 0 ? (
          <>
            <UserRequest
              disabledUsers={disabledUsers}
              handleDeleteUser={onDeleteUser}
            />

            <Paginations
              currentPage={paginationData.currentPage}
              totalPages={paginationData.totalPages}
              handlePrev={() =>
                handlePageChange(paginationData.currentPage - 1)
              }
              handleNext={() =>
                handlePageChange(paginationData.currentPage + 1)
              }
            />
          </>
        ) : (
          <p className="text-center p-5 font-semibold text-2xl mt-5">
            No pending user requests found....
          </p>
        )}
      </>
    </>
  );
}
