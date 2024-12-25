import React from 'react'
import Image from 'next/image'

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

        <form className="w-full mx-auto p-7">

          <div className="flex flex-row w-full space-x-5">
            <div className="w-1/2 mb-5">
              <label htmlFor="email" className="block mb-2 ms-3 text-sm font-medium text-gray-900">
                User name
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-sky-100 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="w-1/2 mb-5">
              <label htmlFor="email" className="block mb-2 ms-3 text-sm font-medium text-gray-900">
                User name
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-sky-100 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                placeholder="John Doe"
                required
              />
            </div>

          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 ms-3 text-sm font-medium text-gray-900">
              Email addrress
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-sky-100 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="name@flowbite.com"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 ms-3 text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow-sm bg-sky-100 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="name@flowbite.com"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 ms-3 text-sm font-medium text-gray-900">
              Repeat password
            </label>
            <input
              type="password"
              id="password"
              className="shadow-sm bg-sky-100 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="name@flowbite.com"
              required
            />
          </div>

          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              I agree with the{' '}
              <button type="button" className="text-blue-600 hover:underline dark:text-blue-500">
                terms and conditions
              </button>
            </label>
          </div>

          <div className="flex flex-row-reverse">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-3xl text-sm font-semibold px-5 py-3 text-center"
            >
              Sign up
            </button>
          </div>

        </form>

        <div></div>

      </div>

    </>
  )
}