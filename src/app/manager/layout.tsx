import AddEmployeeIcon from "@/components/icons/AddEmployeeIcon";
import DashboardIcon from "@/components/icons/DashboardIcon";
import EmployeeViewIcon from "@/components/icons/EmployeeViewIcon";
import SideBar from "@/components/SideBar";
import { UserProvider } from "@/context/UserContext";
import { ClipboardList } from "lucide-react";

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
];

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <UserProvider>
      <SideBar menuItems={menuItems}>{children}</SideBar>
    </UserProvider>
  );
}
