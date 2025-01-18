'use client';
import CloseButton from '../CloseButton';
import DateInput from '../DateInput'
import { Checkbox, FormControlLabel } from '@mui/material'

type UserRequestFilterProps = {
    onClose: () => void;
    updateFilters: (filters: UserFilters) => void;
}

export default function UserRequestFilter({ onClose, updateFilters }: Readonly<UserRequestFilterProps>) {

    const handleSubmit = (formData: FormData) => {
        const data = Object.fromEntries(formData.entries()) as Record<string, string>;
        console.log(data);
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-75 p-5">
            <div
                aria-hidden="true"
                className="fixed inset-0 z-50 flex items-center justify-center w-full h-full"
            >
                <div className="relative p-4 w-full max-w-fit bg-white rounded-lg shadow dark:bg-gray-800">
                    <CloseButton />

                    <p className='font-semibold border-b py-2'>Filter user request</p>

                    <form action={handleSubmit}>
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

                            <p className='mt-7'>User type</p>

                            <div className='flex flex-col sm:flex-row gap-5 mt-2 justify-between px-5'>
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Admin" />
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Manager" />
                                <FormControlLabel control={<Checkbox defaultChecked />} label="User" />
                            </div>
                        </div>

                        <div className='flex justify-end border-t gap-3'>
                            <button
                                type="submit"
                                className="py-2 px-3 mt-3 text-sm font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800"
                            >
                                Apply filters
                            </button>

                            <button
                                type="button"
                                className="py-2 px-3 mt-3 text-sm font-medium text-white rounded-lg bg-gray-400 hover:bg-gray-500"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}
