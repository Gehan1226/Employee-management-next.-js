import React from "react";
import Image from "next/image";
import Tooltip from "@mui/material/Tooltip";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function EmployeeTaskSelector() {
  return (
    <>
      <div className="flex justify-between gap-5">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Employee</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            value={10}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="flex flex-col gap-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md p-2">
        <p className="font-semibold px-2">Selected Employees</p>
        <div className="flex flex-col shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md mt-3">
          <div className="flex justify-between">
            <div className="flex px-4 py-2 gap-3">
              <Image
                src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
                alt="user placeholder image"
                width={45}
                height={45}
              />

              <div>
                <p className="font-semibold">Gehan Sithija</p>
                <p className="text-gray-500">Manager</p>
              </div>
            </div>

            <Tooltip title="Delete employee" placement="top" arrow>
              <button type="button" className="m-5 h-fit ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
}
