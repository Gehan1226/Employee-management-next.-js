import React from 'react'

type PaginationsProps = {
    currentPage: number
    totalPages: number
    handlePrev: () => void
    handleNext: () => void
}

export default function Paginations({ currentPage, handlePrev, handleNext }: Readonly<PaginationsProps>) {



    return (
        <div className="flex flex-col items-center mt-10">
            <span className="text-sm text-gray-700 dark:text-gray-400">
                Showing <span className="font-semibold text-gray-900 dark:text-white">1</span> to <span className="font-semibold text-gray-900 dark:text-white">10</span> of <span className="font-semibold text-gray-900 dark:text-white">100</span> Entries
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
                <button
                    className="flex items-center justify-center px-5 h-10 text-sm font-medium text-white bg-gray-600 rounded-s hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handlePrev}
                    disabled={currentPage === 0}
                >
                    <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" d="M13 5H1m0 0 4 4M1 5l4-4" />
                    </svg>
                    Prev
                </button>
                <button
                    className="flex items-center justify-center px-5 h-10 text-sm font-medium text-white bg-gray-600 border-0 border-s border-gray-700 rounded-e hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleNext}
                    disabled={currentPage === 2}
                >
                    Next
                    <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
