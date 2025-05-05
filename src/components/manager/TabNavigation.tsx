import React from "react";

type TabNavigationProps = {
  activeTab: number;
  onTabChange: (tabIndex: 0 | 1) => void;
};

export default function TabNavigation({
  activeTab,
  onTabChange,
}: Readonly<TabNavigationProps>) {
  const tabs = [
    { id: 0, label: "Task Information" },
    { id: 1, label: "Assigned Employees" },
  ];

  return (
    <div className="flex gap-10 justify-between mt-7 mb-3 px-10">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`text-gray-500 px-4 py-2 rounded-md font-semibold ${
            activeTab === tab.id ? "bg-green-200" : "bg-gray-100"
          }`}
          onClick={() => onTabChange(tab.id as 0 | 1)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
