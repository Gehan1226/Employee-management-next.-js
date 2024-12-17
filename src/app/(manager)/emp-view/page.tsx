import EmployeeCard from '@/app/components/EmployeeCard'
import React from 'react'

export default function page() {
  return (
    <>
      <p className="font-semibold text-2xl text-center">Employee View</p>

      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4 mt-5">
        <EmployeeCard />
        <EmployeeCard />
        <EmployeeCard />
        <EmployeeCard />
      </div>

    </>
  )
}
