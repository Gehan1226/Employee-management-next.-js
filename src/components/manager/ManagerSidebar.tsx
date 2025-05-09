"use client";
import { getManagerByEmployeeId } from "@/api/manager";
import { useUserContext } from "@/context/UserContext";
import { useUserDetails } from "@/hooks/useUserDetails ";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import AuthorizationErrorModal from "../AuthorizationErrorModal";
import queryClient from "@/lib/util/queryClient";
import SideBar from "../SideBar";
import AddEmployeeIcon from "@/components/icons/AddEmployeeIcon";
import DashboardIcon from "@/components/icons/DashboardIcon";
import EmployeeViewIcon from "@/components/icons/EmployeeViewIcon";
import { ClipboardList, DoorOpen, LayoutList } from "lucide-react";

const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    link: "/manager/manager-dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Employee Registration",
    link: "/manager/add-employee",
    icon: <AddEmployeeIcon />,
  },
  {
    name: "Employee View",
    link: "/manager/employees",
    icon: <EmployeeViewIcon />,
  },
  { name: "Create Task", link: "/manager/add-task", icon: <ClipboardList /> },
  { name: "View Tasks", link: "/manager/view-tasks", icon: <LayoutList /> },
  { name: "Manage Leaves", link: "/manager/leaves", icon: <DoorOpen /> },
];

export default function ManagerSidebar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { updateUser, updateManager } = useUserContext();
  const { user: userData, isAuthorizationError } = useUserDetails();

  const { data: manager } = useQuery({
    queryKey: ["manager"],
    queryFn: () => getManagerByEmployeeId(userData?.employee?.id ?? 0),
    enabled: !!userData,
  });

  useEffect(() => {
    if (userData) {
      updateUser(userData);
    }
  }, [userData, updateUser]);

  useEffect(() => {
    if (userData && manager) {
      updateManager(manager);
    }
  }, [userData, manager, updateManager]);

  const handleModalClose = () => {
    queryClient.removeQueries({ queryKey: ["user"] });
    router.push("/user-login");
  };

  return (
    <>
      <SideBar menuItems={menuItems}>{children}</SideBar>
      <AuthorizationErrorModal
        open={!!isAuthorizationError}
        onClose={handleModalClose}
      />
    </>
  );
}
