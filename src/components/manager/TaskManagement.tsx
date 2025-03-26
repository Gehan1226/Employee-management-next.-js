"use client";

import React from "react";
import CreatedTasks from "./CreatedTasks";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import AddTaskModal from "./AddTaskModal";

export default function TaskManagement() {
  return (
    <>
      <div className="bg-blue-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 shadow-md">
        <p className="text-center p-5 font-semibold text-2xl mb-5">
          Task Management
        </p>
      </div>

      <div className="flex gap-4 flex-row-reverse w-full mb-5">
        <AddTaskModal />
      </div>

      <Card className="flex flex-col col-span-2">
        <CardHeader className="items-center pb-0">
          <CardTitle>Task Table</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <CreatedTasks />
        </CardContent>
      </Card>
    </>
  );
}
