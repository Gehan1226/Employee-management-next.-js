import React from "react";
import { Divider } from "@mui/material";
import Image from "next/image";
import { UserResponse } from "@/types/auth-types";

type AdminAccountProps = {
  user: UserResponse;
};

export default function AdminAccount({ user }: Readonly<AdminAccountProps>) {
  return (
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
          <p className="font-semibold ">{user.userName}</p>
          <p className="font-semibold text-xs text-slate-500">
            {user.email}
          </p>
        </div>
      </div>

      <button className="bg-orange-400 hover:bg-orange-500 rounded-md px-7 py-2 h-fit text-white">
        Select
      </button>
    </div>
  );
}
