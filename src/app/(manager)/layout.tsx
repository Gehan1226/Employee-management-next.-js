import SideBar from '../components/SideBar';
import AddEmployeeIcon from '../components/icons/AddEmployeeIcon';
import DashboardIcon from '../components/icons/DashboardIcon';
import EmployeeViewIcon from '../components/icons/EmployeeViewIcon';


const menuItems: MenuItem[] = [
  { name: "Dashboard", link: "/manager-dashboard", icon: <DashboardIcon /> },
  { name: "Employee Registration", link: "/add-employee", icon: <AddEmployeeIcon /> },
  { name: "Employee View", link: "/emp-view", icon: <EmployeeViewIcon /> },
];

export default function layout({ children }: Readonly<{ children: React.ReactNode; }>) {


  return (  
      <SideBar menuItems={menuItems}>
        {children}
      </SideBar>
  )
}