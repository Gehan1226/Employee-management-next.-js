import AddEmployeeIcon from "@/components/icons/AddEmployeeIcon";
import DashboardIcon from "@/components/icons/DashboardIcon";
import EmployeeViewIcon from "@/components/icons/EmployeeViewIcon";
import SideBar from "@/components/SideBar";
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
  { name: "Task", link: "/manager/task", icon: <ClipboardList /> },
];

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SideBar menuItems={menuItems}>{children}</SideBar>;
}
