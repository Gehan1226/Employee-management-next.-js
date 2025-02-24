import React from "react";
import CreatedTasks from "./CreatedTasks";

export default function TaskManagement() {
  return (
    <>
      <div className="bg-blue-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 shadow-md">
        <p className="text-center p-5 font-semibold text-2xl mb-5">
          Task Management
        </p>
      </div>

      <div>
        <CreatedTasks />
      </div>
    </>
  );
}
