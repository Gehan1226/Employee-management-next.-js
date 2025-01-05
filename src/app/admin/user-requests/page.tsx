import UserRequest from '@/app/components/admin/UserRequest'
import React from 'react'

export default function page() {
  return (
    <>

      <div className=' bg-blue-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 shadow-md'>
        <p className='text-center p-5 font-semibold text-2xl mb-5'>Pending User Requests</p>
      </div>

      <UserRequest />
    </>

  )
}
