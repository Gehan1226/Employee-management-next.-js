"use client";
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'

type SideBarProps = {
    menuItems: MenuItem[];
    children: React.ReactNode;
};

export default function SideBar({ menuItems, children }: Readonly<SideBarProps>) {
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    const onClickMenuItem = (item: MenuItem): void => {
        router.push(item.link);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <>
            <div className="flex">
                <aside
                    id="default-sidebar"
                    className={`fixed top-0 left-0 z-40 w-64 h-screen bg-gray-50 dark:bg-gray-800 transition-transform duration-300 sm:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
                    aria-label="Sidebar"
                >
                    <div className="h-full px-3 py-4 overflow-y-auto">
                        <ul className="space-y-2 font-medium">
                            {menuItems.map((item) => (
                                <li key={item.name}>
                                    <div className="flex flex-col w-full">
                                        <button
                                            onClick={() => onClickMenuItem(item)}
                                            className={`flex p-2 text-gray-900 rounded-lg dark:text-white group flex-grow ${pathname === item.link ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
                                        >
                                            {item.icon}
                                            <span className="ms-3 whitespace-nowrap">{item.name}</span>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                <button
                    onClick={toggleSidebar}
                    className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden"
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

                {/* Overlay */}
                {isSidebarOpen && (
                    <button
                        onClick={closeSidebar}
                        className="fixed inset-0 bg-black opacity-50 z-30 sm:hidden cursor-auto"
                        aria-label="Close sidebar"
                    ></button>
                )}
            </div>

            <div className="p-4 sm:ml-64 h-full">
                {children}
            </div>
        </>
    )
}