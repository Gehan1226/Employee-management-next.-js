import { ClipboardList } from "lucide-react";
import SideBar from "../components/SideBar";
import AddEmployeeIcon from "../components/icons/AddEmployeeIcon";
import DashboardIcon from "../components/icons/DashboardIcon";
import EmployeeViewIcon from "../components/icons/EmployeeViewIcon";

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
    link: "/manager/emp-view",
    icon: <EmployeeViewIcon />,
  },
  { name: "Task", link: "/manager/task", icon: <ClipboardList /> },
];

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SideBar menuItems={menuItems}>{children}</SideBar>;
}
