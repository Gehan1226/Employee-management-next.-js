import DashboardIcon from "../components/icons/DashboardIcon";
import UserRequestIcon from "../components/icons/UserRequestIcon";
import SideBar from "../components/SideBar";

const menuItems: MenuItem[] = [
    { name: "Dashboard", link: "/admin/admin-dashboard", icon: <DashboardIcon /> },
    { name: "User Requests", link: "/admin/user-requests", icon: <UserRequestIcon /> },
];

export default function layout({ children }: Readonly<{ children: React.ReactNode; }>) {


    return (
        <SideBar menuItems={menuItems}>
            {children}
        </SideBar>
    )
}