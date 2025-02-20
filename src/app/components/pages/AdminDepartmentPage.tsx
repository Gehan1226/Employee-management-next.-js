"use client";
import React from "react";
import { DepartmentTable } from "../admin/DepartmentTable";
import { RoleTable } from "../admin/RoleTable";
import { EmployeeTable } from "../admin/EmployeeTable";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../card";
import { DepartmentChart } from "../admin/DepartmentChart";
import AddDepartmentModal from "../admin/AddDepartmentModal";
import AddRoleModal from "../admin/AddRoleModal";


export default function AdminDepartmentPage() {
  
  return (
    <>
      <div className="bg-blue-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 shadow-md">
        <p className="text-center p-5 font-semibold text-2xl mb-5">
          Department Management
        </p>
      </div>

      <div className="flex gap-4 flex-row-reverse w-full">
        <div className="grid grid-cols-2 gap-4">
          <AddDepartmentModal />
          <AddRoleModal />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-5">
        <Card className="flex flex-col col-span-2">
          <CardHeader className="items-center pb-0">
            <CardTitle>Department Table</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <DepartmentTable />
          </CardContent>
        </Card>
        <DepartmentChart />
      </div>

      <div className="flex flex-col gap-2 mt-5">
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Roles and Employees Table</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4 mt-5">
            <div className="col-span-2">
              <RoleTable />
            </div>
            <EmployeeTable />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
