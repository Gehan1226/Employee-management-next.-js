"use client";
import { decodeJwt } from "@/lib/util/jwt";
import { Divider } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import UserProfileButton from "./user/UserProfileButton";
import { Bell, CircleHelp } from "lucide-react";
import { useUserContext } from "@/context/UserContext";
import { useUserDetails } from "@/hooks/useUserDetails ";
import queryClient from "@/lib/util/queryClient";
import AuthorizationErrorModal from "./AuthorizationErrorModal";

type SideBarProps = {
  menuItems: MenuItem[];
  children: React.ReactNode;
};

export default function SideBar({
  menuItems,
  children,
}: Readonly<SideBarProps>) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const { updateUser } = useUserContext();
  const router = useRouter();

    const { user: userData, isAuthorizationError } = useUserDetails(userName);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await decodeJwt();
        setUserName(data.sub);
      } catch (error) {
        console.error("Error decoding JWT:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (userData) {
      updateUser(userData);
    }
  }, [userData, updateUser]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleModalClose = () => {
    queryClient.removeQueries({ queryKey: ["user"] });
    router.push("/user-login");
  };

  return (
    <>
      <div className="flex">
        <aside
          id="default-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen bg-[#F3F8FF] shadow-[4px_0_10px_rgba(0,0,0,0.1)] transition-transform duration-300 sm:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-label="Sidebar"
        >
          <div className="h-full flex flex-col justify-between px-3 py-4 overflow-y-auto">
            <ul className="space-y-2 font-medium">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.link}
                    passHref
                    className="flex flex-col w-full"
                  >
                    <button
                      className={`flex px-5 py-2 text-sm text-gray-900 rounded-lg group flex-grow ${
                        pathname === item.link
                          ? "bg-blue-200"
                          : "hover:bg-gray-200"
                      }`}
                    >
                      {item.icon}
                      <span className="ms-3 whitespace-nowrap">
                        {item.name}
                      </span>
                    </button>
                  </Link>
                </li>
              ))}
            </ul>

            <div>
              <Divider variant="middle" className="mb-2" />
              <button className="flex gap-2 text-sm font-semibold items-center hover:bg-gray-200 px-5 py-2 w-full rounded-lg mb-2 ml-2">
                <CircleHelp />
                Help Center
              </button>
              <button className="flex gap-2 text-sm font-semibold items-center hover:bg-gray-200 px-5 py-2 w-full rounded-lg mb-2 ml-2">
                <Bell />
                Notifications
              </button>
              <Divider variant="middle" />
              <UserProfileButton user={userData} />
            </div>
          </div>
        </aside>

        <button
          onClick={toggleSidebar}
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:hidden"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>

        {isSidebarOpen && (
          <button
            onClick={closeSidebar}
            className="fixed inset-0 bg-black opacity-50 z-30 sm:hidden cursor-auto"
            aria-label="Close sidebar"
          ></button>
        )}
      </div>

      <div className="p-4 sm:ml-64 h-full">{children}</div>

      <AuthorizationErrorModal
        open={!!isAuthorizationError}
        onClose={handleModalClose}
      />
    </>
  );
}
