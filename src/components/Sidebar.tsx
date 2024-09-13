import React, { useState } from "react";
import Link from "next/link";
import { FaHome, FaUser, FaBook, FaSignOutAlt } from 'react-icons/fa';
import { usePathname, useRouter } from 'next/navigation';
import { auth } from '@/firebase';
import { signOut } from 'firebase/auth';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) =>
    pathname === path
      ? isCollapsed
        ? "bg-gray-900 w-16 text-indigo-500"
        : "bg-gray-900 text-indigo-500"
      : "";

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <div className={`flex z-50 bg-black text-white fixed transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} sidebar-container`}>
      <div className={`flex flex-col ${isCollapsed ? 'w-16' : 'w-64'} sidebar-content`}>
        <nav className="flex-1 flex flex-col">
          <ul className="flex flex-col flex-1">
            <li className="flex flex-1">
              <Link href="/home" className={`flex-1 flex items-center justify-center p-4 text-xl hover:bg-gray-900 hover:text-indigo-500 ${isActive('/home')}`}>
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

      <style jsx>{`
        /* Non-mobile styles */
        .sidebar-container {
          top: 0;
          left: 0;
          height: 100vh; /* Full vertical height */
        }

        /* Mobile styles */
        @media (max-width: 768px) {
          .sidebar-container {
            top: auto;
            bottom: 0;
            left: 0;
            width: 100%;
            height: auto;
            flex-direction: row;
            justify-content: space-around;
          }

          .sidebar-content {
            flex-direction: row;
            width: 100%;
            height: 4rem;
          }

          .sidebar-content ul {
            flex-direction: row;
            width: 100%;
          }

          .sidebar-content li {
            flex: 1;
          }

          .sidebar-content li span {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
