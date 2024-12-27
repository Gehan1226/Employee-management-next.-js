import AddEmployeeForm from '@/app/components/AddEmployeeForm';
import React from 'react';

export default function page() {


  return (
    <div className="mt-5 max-w-5xl mx-auto shadow-2xl bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0">

      <p className="font-semibold text-2xl text-center">Employee Registration</p>

      <AddEmployeeForm />

    </div >

  )
}

