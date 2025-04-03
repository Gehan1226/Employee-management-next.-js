import React from "react";

export default function AccountSkelton() {
  return (
    <div className="bg-white flex justify-center items-center gap-10 px-3 py-3 rounded-md mt-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <div className="flex gap-4 justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <div className="bg-gray-300 rounded-full w-12 h-12 animate-pulse"></div>
          <div className="bg-gray-200 rounded w-20 h-4 animate-pulse mt-2"></div>
        </div>
        <div className="border-l border-gray-300 h-10"></div>
        <div className="flex flex-col">
          <div className="bg-gray-200 rounded w-32 h-5 animate-pulse mb-1"></div>
          <div className="bg-gray-200 rounded w-24 h-4 animate-pulse"></div>
        </div>
      </div>
      <button className="bg-gray-300 rounded-md px-7 py-2 h-fit text-white animate-pulse">
        <div className="bg-gray-200 rounded w-16 h-4 animate-pulse"></div>
      </button>
    </div>
  );
}
