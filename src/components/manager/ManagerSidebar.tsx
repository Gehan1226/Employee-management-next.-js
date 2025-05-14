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
import {
  CheckCircle,
  ClipboardList,
  Contact,
  DoorOpen,
  LayoutDashboard,
  LayoutList,
  UserPlus,
} from "lucide-react";

const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    link: "/manager/manager-dashboard",
    icon: <LayoutDashboard />,
  },
  {
    name: "Mark Attendance",
    link: "/manager/mark-attendance",
    icon: <CheckCircle />,
  },
  {
    name: "Employee Registration",
    link: "/manager/add-employee",
    icon: <UserPlus />,
  },
  {
    name: "Employee View",
    link: "/manager/employees",
    icon: <Contact />,
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
