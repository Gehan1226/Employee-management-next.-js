import { TaskEmployeeResponse } from "@/types/task";
import { Menu, Tooltip } from "@mui/material";
import React, { useState } from "react";

type EmployeeMenuProps = {
  employeeList: TaskEmployeeResponse[];
};

export default function EmployeeMenu({
  employeeList,
}: Readonly<EmployeeMenuProps>) {
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <div className="capitalize font-semibold text-slate-800 text-xs">
      <div className="flex gap-2 ">
        {employeeList.length <= 3 ? (
          employeeList.map((employee) => (
            <Tooltip
              key={employee.id}
              placement="right-start"
              title={`${employee.firstName} ${employee.lastName}`}
            >
              <div
                key={employee.id}
                className="bg-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold text-xs"
              >
                {employee.firstName.charAt(0)}
              </div>
            </Tooltip>
          ))
        ) : (
          <>
            {employeeList.slice(0, 3).map((employee) => (
              <Tooltip
                key={employee.id}
                placement="right-start"
                title={`${employee.firstName} ${employee.lastName}`}
              >
                <div
                  key={employee.id}
                  className="bg-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold text-xs"
                >
                  {employee.firstName.charAt(0)}
                </div>
              </Tooltip>
            ))}
            <button
              type="button"
              className="flex items-center justify-center font-semibold text-xs px-2 py-1 hover:bg-gray-200 rounded"
              onClick={(e) => {
                setOpenMenu(true);
                setAnchorEl(e.currentTarget);
              }}
            >
              {employeeList.length - 3}+
            </button>
          </>
        )}
      </div>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={openMenu}
        anchorEl={anchorEl}
        onClose={() => setOpenMenu(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {employeeList.map((employee) => (
          <div key={employee.id} className="px-2 py-1 hover:bg-gray-200">
            {employee.firstName} {employee.lastName}
          </div>
        ))}
      </Menu>
    </div>
  );
}
