import React from "react";

export default function AdminDepartmentPage() {
  return (
    <>
      <div className="bg-blue-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 shadow-md">
        <p className="text-center p-5 font-semibold text-2xl mb-5">
          Department Management
        </p>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 shadow-md"
        >
          Add Department
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-5">
        <div>01</div>
        <div>09</div>
      </div>
    </>
  );
}
