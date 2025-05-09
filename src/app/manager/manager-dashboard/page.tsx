"use client";
import { Card } from "@mui/material";
import {
  ArrowRightFromLine,
  CalendarCheck,
  UserCog,
  UsersRound,
} from "lucide-react";
import { Gauge } from "@mui/x-charts/Gauge";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <>
      <Card className="flex gap-10 shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-10 py-2">
        <Image
          src="/dashboard-iamge-manager.png"
          alt="manager-dashboard"
          width={150}
          height={150}
        />

        <div className="flex flex-col">
          <p className="font-semibold text-lg text-gray-500 mt-5">
            Welcome to Your Dashboard
          </p>
          <p className="text-sm text-gray-500">
            Monitor and manage all tasks assigned to your team in one place.
          </p>
        </div>
      </Card>

      <div className="flex gap-5 mt-5">
        <Card className="flex items-center bg-gradient-to-r from-violet-600 via-violet-500 to-violet-400 gap-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-5 py-2">
          <UsersRound color="#ffffff" />
          <div>
            <p className="font-semibold text-lg text-white">120</p>
            <p className="font-semibold text-xs text-white">Total Employees</p>
          </div>
        </Card>

        <Card className="flex items-center bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 gap-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-5 py-2">
          <UserCog color="#ffffff" />
          <div>
            <p className="font-semibold text-lg text-white">20</p>
            <p className="font-semibold text-xs text-white">Total Roles</p>
          </div>
        </Card>

        <Card className="flex items-center bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 gap-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-5 py-2">
          <CalendarCheck color="#ffffff" />
          <div>
            <p className="font-semibold text-lg text-white">12</p>
            <p className="font-semibold text-xs text-white">Total Tasks</p>
          </div>
        </Card>

        <Card className="flex items-center bg-gradient-to-r from-green-600 via-green-500 to-green-400 gap-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-5 py-2">
          <ArrowRightFromLine color="#ffffff" />
          <div>
            <p className="font-semibold text-lg text-white">10</p>
            <p className="font-semibold text-xs text-white">Total Leaves</p>
          </div>
        </Card>
      </div>

      <div className="flex">
        <Card className="flex flex-col gap-5 items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-10 py-2 mt-5">
          <Gauge
            value={75}
            startAngle={-110}
            endAngle={110}
            text={({ value, valueMax }) => `${value} / ${valueMax}`}
          />

          <p className="font-semibold text-sm text-gray-500">Working Employees</p>

        </Card>
      </div>
    </>
  );
}
