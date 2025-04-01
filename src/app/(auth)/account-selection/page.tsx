import { Divider } from "@mui/material";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <div className="min-h-screen w-full">
      <div className="min-h-screen flex items-center justify-center">
        <div className="rounded-xl border bg-card text-card-foreground shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-fit px-20 py-3">
          <p className="font-semibold text-gray-800 text-2xl text-center py-5">
            Select an Account
          </p>

          <div className="bg-violet-100 flex justify-center items-center gap-10 px-3 py-3 rounded-md shadow-md mt-5">
            <div className="flex gap-4 justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <Image
                  src="/employee-type-img.png"
                  alt="employee image"
                  width={50}
                  height={50}
                />
                <p className="font-semibold text-sm text-gray-600">Employee</p>
              </div>
              <Divider orientation="vertical" variant="middle" flexItem />
              <div className="flex flex-col">
                <p className="font-semibold ">Gehan Sithija</p>
                <p className="font-semibold text-xs text-slate-500">
                  gehansithija1226@gmail.com
                </p>
              </div>
            </div>

            <button className="bg-indigo-400 hover:bg-indigo-500 rounded-md px-7 py-2 h-fit text-white">
              Select
            </button>
          </div>

          <div className="bg-green-100 flex justify-center items-center gap-10 px-3 py-3 rounded-md shadow-md mt-2">
            <div className="flex gap-4 justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <Image
                  src="/manager-type-img.png"
                  alt="employee image"
                  width={50}
                  height={50}
                />
                <p className="font-semibold text-sm text-gray-600">Manager</p>
              </div>
              <Divider orientation="vertical" variant="middle" flexItem />
              <div className="flex flex-col">
                <p className="font-semibold ">Gehan Sithija</p>
                <p className="font-semibold text-xs text-slate-500">
                  gehansithija1226@gmail.com
                </p>
              </div>
            </div>

            <button className="bg-emerald-400 hover:bg-emerald-500 rounded-md px-7 py-2 h-fit text-white">
              Select
            </button>
          </div>

          <div className="bg-red-100 flex justify-center items-center gap-10 px-3 py-3 rounded-md shadow-md mt-2">
            <div className="flex gap-4 justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <Image
                  src="/admin-type-img.png"
                  alt="employee image"
                  width={50}
                  height={50}
                />
                <p className="font-semibold text-sm text-gray-600">Admin</p>
              </div>
              <Divider orientation="vertical" variant="middle" flexItem />
              <div className="flex flex-col">
                <p className="font-semibold ">Gehan </p>
                <p className="font-semibold text-xs text-slate-500">
                  gehansithija1226@gmail.com
                </p>
              </div>
            </div>

            <button className="bg-orange-400 hover:bg-orange-500 rounded-md px-7 py-2 h-fit text-white">
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
