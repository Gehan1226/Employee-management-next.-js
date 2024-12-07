"use client"
import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar';

const menuItems: MenuItem[] = [
  { name: "Dashboard", link: "/manager-dashboard" },
  { name: "Employee Registration", link: "/add-employee" },
];

export default function layout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    setIsLoad(true);
  }, []);

  return (
    <>
      {isLoad && (
        <SideBar menuItems={menuItems}>
          {children}
        </SideBar>
      )}
    </>
  )
}