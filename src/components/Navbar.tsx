"use client";
import React from "react";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import logo from '../../public/LEARN LUGHA.png';

const Navbar = () => {
    return (
        <nav className="sticky z-[100] h-14 py-4 inset-x-0 top-0 w-full text-white shadow-lg bg-black">
            <MaxWidthWrapper>
                <div className="flex h-14 items-center justify-between">
                    <div className="flex justify-center items-center">
                        <Image
                            src={logo}
                            className="hidden sm:block h-10 w-10"
                            alt="Logo"
                        />
                        <Link
                            href="/"
                            className="flex z-40 pl-2 pt-0.5 text-xl font-bold text-white"
                        >
                            {/* Learn<span className="text-indigo-600">Lugha</span> */}
                        </Link>
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    );
};

export default Navbar;