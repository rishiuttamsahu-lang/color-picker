'use client';

import { motion } from 'framer-motion';

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: string[];
}

export function Tabs({ activeTab, onTabChange, tabs }: TabsProps) {
  return (
    <div className="relative flex space-x-1 bg-gray-100/80 p-1 rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer ${
            activeTab === tab
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {activeTab === tab && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-white rounded-md shadow-sm"
              initial={false}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30
              }}
            />
          )}
          <span className="relative z-10">{tab}</span>
        </button>
      ))}
    </div>
  );
}
