"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaHome, FaUser, FaBook, FaSignOutAlt } from 'react-icons/fa'; // Import new icon
import { usePathname } from 'next/navigation'; // Import usePathname for current route
import logo from '../../public/LEARN LUGHA.png'; // Update the path if needed

const Sidebar = () => {
  const pathname = usePathname(); // Get the current route

  const isActive = (path: string) => pathname === path ? "bg-gray-700 text-indigo-600" : "";

  return (
    <div className="flex flex-col h-screen w-64 bg-gray-800 text-white fixed top-0 left-0">
      <Link href="/" className={`flex items-center p-4 text-xl font-bold text-white hover:text-indigo-600 ${isActive('/')}`}>
        <Image
          src={logo}
          className="block h-10 w-10 mr-4"
          alt="Logo"
        />
        <span>
          LEARN<span className="text-indigo-600 text-2xl pl-1.5 pb-1">لغة</span>
        </span>
      </Link>
      <nav className="flex-1 flex flex-col">
        <ul className="flex flex-col flex-1">
          <li className="flex flex-1">
            <Link href="/lessons" className={`flex-1 flex items-center justify-center p-4 text-xl hover:bg-gray-700 ${isActive('/lessons')}`}>
              <FaHome className="mr-3 text-2xl" />
              Learn
            </Link>
          </li>
          <li className="flex flex-1">
            <Link href="/letters" className={`flex-1 flex items-center justify-center p-4 text-xl hover:bg-gray-700 ${isActive('/letters')}`}>
              <FaBook className="mr-3 text-2xl" />
              Letters
            </Link>
          </li>
          <li className="flex flex-1">
            <Link href="/profile" className={`flex-1 flex items-center justify-center p-4 text-xl hover:bg-gray-700 ${isActive('/profile')}`}>
              <FaUser className="mr-3 text-2xl" />
              Profile
            </Link>
          </li>
          <li className="flex flex-1">
            <Link href="/quests" className={`flex-1 flex items-center justify-center p-4 text-xl hover:bg-gray-700 ${isActive('/quests')}`}>
              <FaBook className="mr-3 text-2xl" />
              Quests
            </Link>
          </li>
          <li className="flex flex-1">
            <Link href="/logout" className={`flex-1 flex items-center justify-center p-4 text-xl hover:bg-gray-700 ${isActive('/logout')}`}>
              <FaSignOutAlt className="mr-3 text-2xl" />
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
