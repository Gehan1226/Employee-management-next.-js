import React, { useState } from "react";
import Image from "next/image";
import Menu from "@mui/material/Menu";
import { UserResponse } from "@/types/auth-types";
import { ArrowLeft, User, LogOut } from "lucide-react";

type UserProfileButtonProps = {
  user: UserResponse | undefined;
};

export default function UserProfileButton({
  user,
}: Readonly<UserProfileButtonProps>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <button
        className="flex gap-2 items-center hover:bg-gray-200 px-5 py-2 mt-4 w-full rounded-lg"
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Image
          src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
          width={30}
          height={30}
          alt="User Avatar"
          className="rounded-full w-10 h-10"
        />
        <div className="flex flex-col text-left">
          <p className="font-semibold">{user?.userName}</p>
          <p className="font-semibold text-xs text-slate-500">{user?.email}</p>
        </div>
      </button>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <button className="flex gap-2 items-center hover:bg-gray-200 px-5 py-2 w-full rounded-lg">
          <User width={15} height={15} />
          User Profile
        </button>
        <button className="flex gap-2 items-center hover:bg-gray-200 px-5 py-2 w-full rounded-lg">
          <ArrowLeft width={15} height={15} />
          Account selection
        </button>
        <button className="flex gap-2 items-center hover:bg-gray-200 px-5 py-2 w-full rounded-lg">
          <LogOut width={15} height={15} />
          Log out
        </button>
      </Menu>
    </>
  );
}
