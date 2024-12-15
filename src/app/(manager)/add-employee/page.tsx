"use client";
import { registerEmployee } from '@/app/api/employee';
import CountrySelector from '@/app/components/CountrySelector';
import Input from '@/app/components/Input';
import { Datepicker } from 'flowbite-react';
import React, { useActionState } from 'react'


function onSubmitForm(prevState: any, formData: FormData) {
  return registerEmployee(formData);
}

export default function page() {

  const [message, formAction, isPending] = useActionState(onSubmitForm, null);

  return (
    <div className="mt-5 max-w-5xl mx-auto shadow-2xl bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0">

      <p className="font-semibold text-2xl text-center">Employee Registration</p>

      <form className="p-5 mt-4" action={formAction}>

        <div className="grid md:grid-cols-2 md:gap-6">
          <Input label="First Name" id="first_name" name="firstName" />
          <Input label="Last Name" id="last_name" name="lastName" />
        </div>

        <Input label="Email address" id="floating_email" name="email" />

        <Input label="Contact number" id="floating_contact" name="phoneNumber" />

        <div className='mb-6'>
          <p className='text-sm text-slate-600 mb-2'>Date of birth </p>
          <Datepicker />
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div className='flex gap-4 md:items-center flex-col md:flex-row'>
            <select name="role" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="select">Select Gender</option>
            </select>
          </div>

          <div className='flex gap-4 md:items-center flex-col md:flex-row'>
            <select name="role" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="select">Select Department</option>
            </select>
          </div>

          <div className='flex gap-4 md:items-center flex-col md:flex-row'>
            <select name="role" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="select">Select Role</option>
            </select>
          </div>
        </div>

        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

        <div className="grid md:grid-cols-2 gap-6 mt-6">

          <CountrySelector />

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

    </div >

  )
}

