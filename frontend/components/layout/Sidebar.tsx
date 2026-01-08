// frontend/components/layout/Sidebar.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Profile', href: '/dashboard/profile' },
  { name: 'Settings', href: '/settings' },
  { name: 'About & Help', href: '/about' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: isOpen ? '0%' : '-100%' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed inset-y-0 left-0 z-50 w-64 bg-surface backdrop-blur-md border-r border-opacity-20 border-white-500 shadow-lg p-6 text-text-DEFAULT flex flex-col"
    >
      <button onClick={onClose} className="text-xl text-right mb-8">
        &times; {/* Close button */}
      </button>
      <nav className="flex-1">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-4">
              <Link href={item.href} passHref>
                <motion.span
                  className={`block text-lg font-semibold py-2 px-4 rounded-lg transition-colors duration-200 ${
                    pathname === item.href
                      ? 'bg-primary bg-opacity-30 text-white'
                      : 'hover:bg-primary hover:bg-opacity-20'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.name}
                </motion.span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* Optionally, add more content like a footer or version info here */}
    </motion.div>
  );
};

export default Sidebar;
