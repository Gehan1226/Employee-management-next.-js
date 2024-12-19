"use client";
import EmployeeCard from '@/app/components/EmployeeCard'
import EmployeeFilterPopup from '@/app/components/EmployeeFilterPopup';
import SearchBar from '@/app/components/SearchBar'
import React, { useState } from 'react'

export default function page() {

  const [isActiveFilter, setIsActiveFilter] = useState<boolean>(false);

  const handleFliterPopup = () => {
    setIsActiveFilter((prev) => !prev)
  }

  return (
    <>

      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-4">
          <SearchBar />
        </div>

        <button id="sortDropdownButton1" data-dropdown-toggle="dropdownSort1" type="button" className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 sm:w-auto">
          <svg className="-ms-0.5 me-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M7 4l3 3M7 4 4 7m9-3h6l-6 6h6m-6.5 10 3.5-7 3.5 7M14 18h4" />
          </svg>
          Sort
        </button>

        <button
          data-modal-toggle="filterModal"
          data-modal-target="filterModal"
          type="button"
          className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 sm:w-auto"
          onClick={handleFliterPopup}
        >
          <svg className="-ms-0.5 me-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z" />
          </svg>
          Filters
        </button>

      </div>

      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4 mt-5">
        <EmployeeCard />
        <EmployeeCard />
        <EmployeeCard />
        <EmployeeCard />
        <EmployeeCard />
        <EmployeeCard />
      </div>

      {isActiveFilter && (
        <EmployeeFilterPopup
          onClosePopup={handleFliterPopup}
        />
      )}

    </>
  )
}
