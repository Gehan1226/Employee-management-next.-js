"use client";
import Input from '@/app/components/Input';
import PhoneInputField from '@/app/components/PhoneInput';
import { Datepicker } from 'flowbite-react';
import React, { useActionState, useEffect, useState } from 'react'
import { registerEmployee } from '../api/employee';
import CountrySelector from './CountrySelector';
import DropDownMenu from './DropDownMenu';
import { getAllDepartments } from '../api/department';
import { Department } from '../types/response-types';
import { mapDepartmentToDropdownItem } from '../lib/util/map-object';

function onSubmitForm(prevState: any, formData: FormData) {
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;
    console.log(data);
}

export default function AddEmployeeForm() {
    const [message, formAction, isPending] = useActionState(onSubmitForm, null);
    const [departments, setDepartments] = useState<Department[]>([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await getAllDepartments();
                console.log(response)
                setDepartments(response.data ?? []);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }            
        };
        fetchDepartments();
    }, []);

    return (
        <form className="p-5 mt-4" action={formAction}>

            <div className="grid md:grid-cols-2 md:gap-6">
                <Input label="First Name" id="first_name" name="firstName" />
                <Input label="Last Name" id="last_name" name="lastName" />
            </div>

            <Input label="Email address" id="floating_email" name="email" />

            <div className='mb-6'>
                <p className='text-sm text-slate-600 mb-2'>Contact number</p>
                <PhoneInputField />
            </div>

            <div className='mb-6'>
                <p className='text-sm text-slate-600 mb-2'>Date of birth </p>
                <Datepicker />
            </div>

            <div className="grid md:grid-cols-2 gap-6">

                <div className='flex gap-4 md:items-center flex-col md:flex-row'>
                    <DropDownMenu
                        label="Gender"
                        menuItems={[
                            { label: "Male", id: 'Male' },
                            { label: "Female", id: "Female" },
                            { label: "Other", id: "Other" }
                        ]}
                        name='gender'
                    />
                </div>

                <div className='flex gap-4 md:items-center flex-col md:flex-row'>
                    <DropDownMenu
                        label="Department"
                        menuItems={mapDepartmentToDropdownItem(departments)}
                        name='department'
                    />
                </div>

                <div className='flex gap-4 md:items-center flex-col md:flex-row'>
                    <DropDownMenu
                        label="Role"
                        menuItems={[]}
                        name='role'
                    />
                </div>
            </div>

            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

            <div>
                <CountrySelector name='country' />

            </div>

            <div className="grid md:grid-cols-2 gap-3 mt-6">

                <Input label="State" id="floating_state" name="state" />

                <Input label="District" id="floating_district" name="district" />

                <Input label="City" id="floating_city" name="city" />

                <Input label="Street" id="floating_street" name="street" />

                <Input label="Postal code" id="floating_postal" name="postalCode" />

            </div>

            <div className='flex flex-row-reverse mt-6'>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </div>

        </form >
    )
}
