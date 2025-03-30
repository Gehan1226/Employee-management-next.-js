import React from "react";
import { Card, CardContent } from "../card";
import { Divider } from "@mui/material";

export default function EmployeeCard() {
  return (
    // <div className="bg-white border border-gray-200 backdrop-filter backdrop-blur-sm bg-opacity-20 rounded-lg shadow-md p-5">
    //   <img
    //     className="rounded-full mx-auto w-32 h-32"
    //     src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
    //     alt=""
    //   />
    //   <div className="flex flex-col items-center mt-2">
    //     <p className="font-mono">John Player</p>
    //     <p className="font-mono">Age: 25 </p>
    //     <p className="font-serif">Software Enginner</p>
    //     <p className="font-mono">Sri Lanka</p>
    //     <p className="font-mono">Ex: 2 years</p>

    //     <button
    //       type="button"
    //       className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    //     >
    //       See employee
    //     </button>
    //   </div>
    // </div>
    <Card>
      <CardContent>
        <img
          className="rounded-full mx-auto w-32 h-32 mt-2"
          src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
          alt=""
        />
        <Divider variant="middle" className="mt-4" />

        <div className="flex flex-col gap-1 ml-3 mt-4 text-left">
          <div className="grid grid-cols-4 gap-3 w-full">
            <p className="text-left font-semibold">Name</p>
            <p>:</p>
            <p className="col-span-2 font-semibold text-slate-600">
              Gehan Sithija
            </p>
          </div>
          <div className="grid grid-cols-4 gap-3 w-full">
            <p className="text-left font-semibold">Age</p>
            <p>:</p>
            <p className="col-span-2 font-semibold text-slate-600">
              21 Years old
            </p>
          </div>
          <div className="grid grid-cols-4 gap-3 w-full">
            <p className="text-left font-semibold">Role</p>
            <p>:</p>
            <p className="col-span-2 font-semibold text-slate-600">Intern SE</p>
          </div>
          <div className="grid grid-cols-4 gap-3 w-full">
            <p className="text-left font-semibold">Exp</p>
            <p>:</p>
            <p className="col-span-2 font-semibold text-slate-600">1 Years</p>
          </div>
          <div className="grid grid-cols-4 gap-3 w-full">
            <p className="text-left font-semibold">Country</p>
            <p>:</p>
            <p className="col-span-2 font-semibold text-slate-600">Sri Lanka</p>
          </div>
        </div>

        <Divider variant="middle" className="mt-4" />

        <div className="flex flex-col items-center mt-2">
          <button
            type="button"
            className="w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            See employee
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
