"use client";
import EmployeeCard from "@/components/employee/EmployeeCard";
import EmployeeFilterPopup from "@/components/employee/EmployeeFilterPopup";
import SearchBar from "@/components/SearchBar";
import { useUserContext } from "@/context/UserContext";
import React, { useState } from "react";

export default function EmployeesPage() {
  const { user } = useUserContext();
  const [isActiveFilter, setIsActiveFilter] = useState<boolean>(false);

  const handleFliterPopup = () => {
    setIsActiveFilter((prev) => !prev);
  };

  return (
    <>
      <div className="rounded-md border bg-card text-card-foreground shadow">
        <p className="font-semibold text-sky-600 text-2xl text-center py-5">
          Employee List for {user?.employee?.department.name} Department
        </p>
      </div>

      <div className="grid grid-cols-6 gap-4 mt-3">
        <div className="col-span-4">
          <SearchBar placeholder="Search" onSearch={() => {}} />
        </div>

        <button
          type="button"
          className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-card text-card-foreground shadow px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-200 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 sm:w-auto"
        >
          <svg
            className="-ms-0.5 me-2 h-4 w-4"
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
              d="M7 4v16M7 4l3 3M7 4 4 7m9-3h6l-6 6h6m-6.5 10 3.5-7 3.5 7M14 18h4"
            />
          </svg>
          Sort
        </button>

        <button
          type="button"
          className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-card text-card-foreground shadow px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-200 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 sm:w-auto"
          onClick={handleFliterPopup}
        >
          <svg
            className="-ms-0.5 me-2 h-4 w-4"
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
              strokeWidth="2"
              d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"
            />
          </svg>
          Filters
        </button>
      </div>

      <div className="mt-3 px-2 max-h-[570px] overflow-y-auto  [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400">
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4 mt-5">
          <EmployeeCard />
          <EmployeeCard />
          <EmployeeCard />
          <EmployeeCard />
          <EmployeeCard />
          <EmployeeCard />
          <EmployeeCard />
          <EmployeeCard />
          <EmployeeCard />
          <EmployeeCard />
          <EmployeeCard />
        </div>
      </div>

      {isActiveFilter && (
        <EmployeeFilterPopup onClosePopup={handleFliterPopup} />
      )}
    </>
  );
}
