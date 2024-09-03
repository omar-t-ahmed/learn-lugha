"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaHome, FaUser, FaBook, FaSignOutAlt } from 'react-icons/fa';
import { usePathname, useRouter } from 'next/navigation'; // Import useRouter for redirection
import { auth } from '@/firebase'; // Import your Firebase auth instance
import { signOut } from 'firebase/auth'; // Import signOut function from Firebase
import logo from '../../public/LEARN LUGHA.png';

const Sidebar = () => {
  const pathname = usePathname(); // Get the current route
  const router = useRouter(); // Initialize router

  const isActive = (path: string) => pathname === path ? "bg-gray-700 text-indigo-600" : "";

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      router.push('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

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
            <Link href="/quests" className={`flex-1 flex items-center justify-center p-4 text-xl hover:bg-gray-700 ${isActive('/quests')}`}>
              <FaBook className="mr-3 text-2xl" />
              Quests
            </Link>
          </li>
          <li className="flex flex-1">
            <Link href="/profile" className={`flex-1 flex items-center justify-center p-4 text-xl hover:bg-gray-700 ${isActive('/profile')}`}>
              <FaUser className="mr-3 text-2xl" />
              Profile
            </Link>
          </li>
          <li className="flex flex-1">
            <button
              onClick={handleLogout}
              className="flex-1 flex items-center justify-center p-4 text-xl hover:bg-gray-700 cursor-pointer"
            >
              <FaSignOutAlt className="mr-3 text-2xl" />
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
