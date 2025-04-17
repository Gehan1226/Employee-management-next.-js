import React from "react";
import { Card, CardContent } from "../card";
import { Divider } from "@mui/material";
import { EmployeeResponse } from "@/types/employee";
import Image from "next/image";

type EmployeeCardProps = {
  employee: EmployeeResponse;
};

export default function EmployeeCard({ employee }: Readonly<EmployeeCardProps>) {
  return (
    <Card className="shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <CardContent>
        <Image
          src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
          alt="employee image"
          width={100}
          height={100}
          className="rounded-full mx-auto w-32 h-32 mt-2"
        />

        <Divider variant="middle" className="mt-4" />

        <div className="flex flex-col gap-1 ml-3 mt-4 text-left">
          <div className="grid grid-cols-4 gap-3 w-full">
            <p className="text-left font-semibold">Name</p>
            <p>:</p>
            <p className="col-span-2 font-semibold text-slate-600">
              {employee.firstName} {employee.lastName}
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
            <p className="col-span-2 font-semibold text-slate-600">
              {employee.role.name}
            </p>
          </div>
          <div className="grid grid-cols-4 gap-3 w-full">
            <p className="text-left font-semibold">Exp</p>
            <p>:</p>
            <p className="col-span-2 font-semibold text-slate-600">1 Years</p>
          </div>
          <div className="grid grid-cols-4 gap-3 w-full">
            <p className="text-left font-semibold">Country</p>
            <p>:</p>
            <p className="col-span-2 font-semibold text-slate-600">
              {employee.address.country}
            </p>
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
