"use client";
import { Card, CardContent } from "@mui/material";
import {
  ArrowRightFromLine,
  CalendarCheck,
  UserCog,
  UsersRound,
} from "lucide-react";
import { Gauge } from "@mui/x-charts/Gauge";
import Image from "next/image";
import React from "react";
import BasicScatter from "@/components/manager/Graph";
import { NotificationSwitcher } from "@/components/manager/NotificationSwitcher";

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

      <div className="grid grid-cols-8 gap-5 mt-5">
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

        <Card className="col-span-4 flex items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-gradient-to-r from-slate-200 via-slate-100 to-slate-50">
          <CardContent className="w-full">
            <NotificationSwitcher />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <Card className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-10 py-2 mt-5">
          <p className="font-semibold text-lg text-gray-500 text-center">
            Employee Status
          </p>
          <CardContent>
            <div className="flex flex-col items-center">
              <Gauge
                value={75}
                startAngle={-110}
                endAngle={110}
                text={({ value, valueMax }) => `${value} / ${valueMax}`}
              />

              <p className="font-semibold text-sm text-gray-500">
                Working Employees
              </p>
            </div>

            <div className="flex gap-10 items-center justify-center mt-7">
              <p className="font-semibold text-sm text-gray-900">
                <span>🟩</span> On Leave: 10
              </p>
              <p className="font-semibold text-sm text-gray-900">
                <span>🟧</span> Not Started: 5
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2  w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-10 py-2 mt-5">
          <p className="font-semibold text-lg text-gray-500 text-center">
            Task Status
          </p>
          <CardContent>
            <BasicScatter />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-10 py-2">
        <p className="font-semibold text-lg text-gray-500">
          Your Recent Activities
        </p>
        <CardContent className="flex flex-col gap-3 max-h-[100px] overflow-y-scroll">
          <p className="text-sm text-gray-500">
            📌 Registered a new employee to your team here
          </p>
          <p className="text-sm text-gray-500">
            📌 Created a new task for employees
          </p>
          <p className="text-sm text-gray-500">📌 Approved a leave request</p>
        </CardContent>
      </Card>
    </>
  );
}
