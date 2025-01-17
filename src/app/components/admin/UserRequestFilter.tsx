'use client';
import DateInput from '../DateInput'
import { Checkbox, FormControlLabel } from '@mui/material'

export default function UserRequestFilter() {

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-75 p-5">
            <div
                aria-hidden="true"
                className="fixed inset-0 z-50 flex items-center justify-center w-full h-full"
            >
                <div className="relative p-4 w-full max-w-fit bg-white rounded-lg shadow dark:bg-gray-800">
                    <p className='font-semibold border-b py-2'>Filter user request</p>

                    <div className='p-5'>
                        <p className='mt-5'>Date range</p>

                        <div className='flex flex-col sm:flex-row gap-5 mt-2'>
                            <DateInput
                                label='start date'
                                name='startDate'
                            />
                            <DateInput
                                label='End date'
                                name='endDate'
                            />
                        </div>

                        <p className='mt-5'>User type</p>

                        <div className='flex flex-col sm:flex-row gap-5 mt-2 justify-between px-5'>
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Admin" />
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Manager" />
                            <FormControlLabel control={<Checkbox defaultChecked />} label="User" />
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}
