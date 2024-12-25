import AuthInput from '@/app/components/AuthInput'
import Image from 'next/image'
import React from 'react'

export default function page() {
  return (
    <>
      <div className="flex flex-col basis-3/5 h-screen p-6 bg-white border border-white rounded-e-[50px] shadow-2xl shadow-black justify-between">

        <p className="font-semibold text-sky-600 text-3xl text-center mt-3">Sign in to Emplytic</p>


        <form className="w-full mx-auto p-7">

          <div className="mb-5">
            <AuthInput
              label="Email address"
              id="email"
              type="email"
              name="email"
              placeholder="example@gmail.com"
              required
              error={null}
            />
          </div>

          <div className="mb-5">
            <AuthInput
              label="Password"
              id="password"
              type="password"
              name="password"
              placeholder="●●●●●●●●●●"
              required
              minLength={8}
              error={null}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
              </div>
            </div>
            <a href="#" className="text-sm font-semibold text-sky-600 hover:underline dark:text-primary-500">Forgot password?</a>
          </div>

        </form>

        <div className="w-full">
          <button
            className="group w-1/2 h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
            <div className="relative flex items-center space-x-4 justify-center">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="absolute left-0 w-5" alt="google logo" />
              <span
                className="block w-max font-semibold tracking-wide text-gray-700 dark:text-white text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Continue
                with Google
              </span>
            </div>
          </button>
        </div>
        <div></div>
        <div></div>

      </div>

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
          SIGN UP
        </button>

      </div>
    </>
  )
}
