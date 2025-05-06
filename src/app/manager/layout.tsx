import ManagerSidebar from "@/components/manager/ManagerSidebar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <ManagerSidebar>{children}</ManagerSidebar>;
}
