import React from 'react'

type EmployeeFilterPopupProps = {
    onClosePopup: () => void;
}

export default function EmployeeFilterPopup({ onClosePopup }: Readonly<EmployeeFilterPopupProps>) {
    return (
        <div className="fixed inset-0 z-50 flex justify-center bg-gray-500 bg-opacity-75 p-5">
            <div className="w-full max-w-5xl rounded-lg bg-white shadow-lg z-50 flex flex-col justify-between">

                <div>
                    <div>
                        <div className="border-b border-gray-200 rounded-t ">
                            <div className='flex justify-between p-4 md:p-5'>
                                <h3 className="text-lg font-normal text-gray-500 dark:text-gray-400">Filters</h3>
                                <button
                                    type="button"
                                    className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={onClosePopup}
                                >
                                    <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            <div className='flex gap-5 '>
                                <button className="text-md font-semibold ml-5 inline-block pb-2 hover:text-blue-700" id="brand-tab" data-tabs-target="#brand" type="button" role="tab" aria-controls="profile" aria-selected="false">Skills</button>
                                <button className="text-md font-semibold ml-5 inline-block pb-2 hover:text-blue-700" id="brand-tab" data-tabs-target="#brand" type="button" role="tab" aria-controls="profile" aria-selected="false">Salary</button>
                                <button className="text-md font-semibold ml-5 inline-block pb-2 hover:text-blue-700" id="brand-tab" data-tabs-target="#brand" type="button" role="tab" aria-controls="profile" aria-selected="false">Department</button>
                                <button className="text-md font-semibold ml-5 inline-block pb-2 hover:text-blue-700" id="brand-tab" data-tabs-target="#brand" type="button" role="tab" aria-controls="profile" aria-selected="false">Personal details</button>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-5 p-5 gap-5 mt-5">
                        <div className="flex items-center mb-4">
                            <input id="php-radio" type="radio" value="php" name="skill-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="php-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">PHP</label>
                        </div>

                        <div className="flex items-center mb-4">
                            <input id="java-radio" type="radio" value="java" name="skill-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="java-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Java</label>
                        </div>

                        <div className="flex items-center mb-4">
                            <input id="communication-radio" type="radio" value="communication" name="skill-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="communication-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Communication</label>
                        </div>

                        <div className="flex items-center mb-4">
                            <input id="javascript-radio" type="radio" value="javascript" name="skill-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="javascript-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">JavaScript</label>
                        </div>

                        <div className="flex items-center mb-4">
                            <input id="react-radio" type="radio" value="react" name="skill-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="react-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">React</label>
                        </div>

                        <div className="flex items-center mb-4">
                            <input id="nodejs-radio" type="radio" value="nodejs" name="skill-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="nodejs-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Node.js</label>
                        </div>

                        <div className="flex items-center mb-4">
                            <input id="python-radio" type="radio" value="python" name="skill-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="python-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Python</label>
                        </div>

                        <div className="flex items-center mb-4">
                            <input id="sql-radio" type="radio" value="sql" name="skill-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="sql-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">SQL</label>
                        </div>

                        <div className="flex items-center mb-4">
                            <input id="csharp-radio" type="radio" value="csharp" name="skill-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="csharp-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">C#</label>
                        </div>

                        <div className="flex items-center mb-4">
                            <input id="aws-radio" type="radio" value="aws" name="skill-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="aws-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">AWS</label>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 p-4 flex justify-end">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700">
                        Apply Filters
                    </button>
                </div>

            </div>
        </div>

    )
}
