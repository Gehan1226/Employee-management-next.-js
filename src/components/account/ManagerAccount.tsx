import React from "react";
import { Divider } from "@mui/material";
import Image from "next/image";

export default function ManagerAccount() {
  return (
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
  );
}
