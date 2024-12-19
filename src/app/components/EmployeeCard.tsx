import React from 'react'

export default function EmployeeCard() {
    return (
        <div className="bg-white border border-gray-200 backdrop-filter backdrop-blur-sm bg-opacity-20 rounded-lg shadow-md p-5">
            <img className="rounded-full mx-auto w-32 h-32" src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg" alt="" />
            <div className="flex flex-col items-center mt-2">
                <p className="font-mono">John Player</p>
                <p className="font-mono">Age: 25 </p>
                <p className='font-serif'>Software Enginner</p>
                <p className="font-mono">Sri Lanka</p>
                <p className="font-mono">Ex: 2 years</p>

                <button type="button" className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">See employee</button>
            </div>
        </div>
    )
}
