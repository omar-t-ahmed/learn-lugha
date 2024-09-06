"use client";
import React from "react";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import logo from '../../public/LEARN LUGHA.png';

const Navbar = () => {
    return (
        <nav className="flex items-center h-14 py-4 pt-8 inset-x-0 top-0 w-full text-white ">
                <div className="flex h-14 items-center justify-between">
                    <div className="flex justify-center items-center">
                        <Link
                            href="/">
                        <Image
                            src={logo}
                            className="block h-9 w-9 ml-4 sm:ml-8 mt-1"
                            alt="Logo"
                        />
                        </Link>
                    </div>
                </div>
        </nav>
    );
};

export default Navbar;