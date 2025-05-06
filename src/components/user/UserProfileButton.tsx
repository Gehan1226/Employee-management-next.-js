import React, { useState } from "react";
import Image from "next/image";
import Menu from "@mui/material/Menu";
import { UserResponse } from "@/types/auth-types";
import { ArrowLeft, User, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearAuthCookie } from "@/lib/util/cookie";
import ConfirmDialog from "../ConfirmDialog";

type UserProfileButtonProps = {
  user: UserResponse | null;
};

export default function UserProfileButton({
  user,
}: Readonly<UserProfileButtonProps>) {
  const [openAlert, setOpenAlert] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    setOpenAlert(true);
  };

  const handleConfirmLogout = async () => {
    setOpenAlert(false);
    await clearAuthCookie();
    router.push("/user-login");
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
        <Link
          href="/account-selection"
          className="flex gap-2 items-center hover:bg-gray-200 px-5 py-2 w-full rounded-lg"
        >
          <ArrowLeft width={15} height={15} />
          Account selection
        </Link>
        <button
          className="flex gap-2 items-center hover:bg-gray-200 px-5 py-2 w-full rounded-lg"
          onClick={handleLogout}
        >
          <LogOut width={15} height={15} />
          Log out
        </button>
      </Menu>

      <ConfirmDialog
        open={openAlert}
        handleClose={() => setOpenAlert(false)}
        handleConfirm={handleConfirmLogout}
        message="Are you sure to logout?. You will be redirected to login page."
      />
    </>
  );
}
