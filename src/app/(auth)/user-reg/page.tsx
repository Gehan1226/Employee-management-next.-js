import React from 'react'
import Image from 'next/image'
import UserRegisterForm from '@/app/components/UserRegisterForm';


export default function page() {

  return (
    <>
      <div className="basis-2/5 flex flex-col items-center gap-10 ">

        <div className="text-center mt-5">
          <p className="font-sans text-white text-3xl">Welcome to the <span className="font-semibold">&nbsp;Emplytic</span></p>
          <p className="font-sans text-white text-md"><i> Empowering teams, streamlining success.</i></p>
        </div>

        <Image className="shadow-2xl" src="/logo.png" width={300} height={300} alt="Company logo" />

        <button
          type="button"
          className="text-white bg-sky-700 hover:bg-sky-800 border-2 border-white rounded-3xl text-md font-semibold px-20 py-3 text-center"
        >
          SIGN IN
        </button>

      </div>

      <div className="flex flex-col basis-3/5 h-screen p-6 bg-white border border-white rounded-s-[50px] shadow-2xl shadow-black justify-between">

        <p className="font-semibold text-sky-600 text-3xl text-center mt-3">Sign up to Emplytic</p>

        <UserRegisterForm />

        <div></div>

      </div>

    </>
  )
}