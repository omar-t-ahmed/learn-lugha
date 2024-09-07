import React, { useState } from "react";
import Link from "next/link";
import { FaHome, FaUser, FaBook, FaSignOutAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { usePathname, useRouter } from 'next/navigation';
import { auth } from '@/firebase';
import { signOut } from 'firebase/auth';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State to manage sidebar collapse
  const pathname = usePathname();
  const router = useRouter();

  // Function to handle active state
  const isActive = (path: string) =>
    pathname === path
      ? isCollapsed
        ? "bg-gray-900 w-16 text-indigo-500"
        : "bg-gray-900 text-indigo-500"
      : "";

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <div className={`flex z-50 h-screen bg-black text-white fixed top-0 left-0 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className={`flex flex-col h-full ${isCollapsed ? 'w-16' : 'w-64'}`}>
        <Link href="/" className={`flex items-center justify-center p-4 text-xl font-bold text-white hover:text-indigo-500 ${isActive('/')}`}>
        </Link>
        <nav className="flex-1 flex flex-col">
          <ul className="flex flex-col flex-1">
            <li className="flex flex-1">
              <Link href="/lessons" className={`flex-1 flex items-center justify-center p-4 text-xl hover:bg-gray-900 hover:text-indigo-500 ${isActive('/lessons')}`}>
                <FaHome className="text-2xl" />
                {!isCollapsed && <span className="ml-3">Learn</span>}
              </Link>
            </li>
            <li className="flex flex-1">
              <Link href="/letters" className={`flex-1 flex items-center justify-center p-4 text-xl hover:bg-gray-900 hover:text-indigo-500 ${isActive('/letters')}`}>
                <FaBook className="text-2xl" />
                {!isCollapsed && <span className="ml-3">Letters</span>}
              </Link>
            </li>
            <li className="flex flex-1">
              <Link href="/profile" className={`flex-1 flex items-center justify-center p-4 text-xl hover:bg-gray-900 hover:text-indigo-500 ${isActive('/profile')}`}>
                <FaUser className="text-2xl" />
                {!isCollapsed && <span className="ml-3">Profile</span>}
              </Link>
            </li>
            <li className="flex flex-1">
              <button
                onClick={handleLogout}
                className="flex-1 flex items-center justify-center p-4 text-xl hover:bg-gray-900 hover:text-indigo-500 cursor-pointer"
              >
                <FaSignOutAlt className="text-2xl" />
                {!isCollapsed && <span className="ml-3">Logout</span>}
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2 bg-indigo-500 text-white p-2 rounded-r-full"
      >
        {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </button>
    </div>
  );
};

export default Sidebar;