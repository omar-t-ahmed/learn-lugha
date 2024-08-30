"use client";
import React from "react";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import logo from '../../public/LEARN LUGHA.png';

const Navbar = () => {
    return (
        <nav className="sticky z-[100] flex items-center h-14 py-4 pt-8 inset-x-0 top-0 w-full text-white ">
                <div className="flex h-14 items-center justify-between">
                    <div className="flex justify-center items-center">
                        <Image
                            src={logo}
                            className="block h-10 w-10 ml-4 sm:ml-8"
                            alt="Logo"
                        />
                        <Link
                            href="/"
                            className="flex z-40 pl-2 pt-2 text-xl font-bold text-white"
                        >
                            LEARN<span className="text-indigo-600 text-2xl pl-1.5 pb-1">لغة</span>
                        </Link>
                    </div>
                </div>
        </nav>
    );
};

export default Navbar;