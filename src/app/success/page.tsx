"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/LEARN LUGHA.png";
import { FaArrowRightLong } from "react-icons/fa6";
import hamburgerIcon from "../../../public/icons8-hamburger-menu-50.png";

function SuccessPageContent() {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    useEffect(() => {
        if (!sessionId) {
            setError("No session ID found.");
            return;
        }

        const fetchSession = async () => {
            try {
                const res = await fetch(`/api/stripe/session?session_id=${sessionId}`);
                const data = await res.json();

                if (data.error) {
                    setError(data.error.message);
                } else {
                    setSession(data);
                }
            } catch (err) {
                setError("Failed to fetch session details.");
            } finally {
                setLoading(false);
            }
        };

        fetchSession();
    }, [sessionId]);

    return (
        <div className="bg-black min-h-screen">
            {/* Navbar */}
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8">
                    <div className="flex lg:flex-1">
                        <Link href="/" className="flex justify-center mb-1 items-center">
                            <Image src={logo} className="block h-9 w-9 mb-1" alt="Logo" />
                        </Link>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={toggleMenu}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                        >
                            <Image src={hamburgerIcon} className="h-6 w-6" alt="Hamburger Menu" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        <Link href="/faq" className="text-md font-semibold leading-6 hover:underline text-white">
                            FAQ
                        </Link>
                        <Link href="/pricing" className="text-md font-semibold leading-6 hover:underline text-white">
                            Pricing
                        </Link>
                        <Link href="/about" className="text-md font-semibold leading-6 hover:underline text-white">
                            About
                        </Link>
                        <Link href="/privacy-policy" className="text-md font-semibold leading-6 hover:underline text-white">
                            Privacy Policy
                        </Link>
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <Link href="/home" className="text-md flex items-center justify-center font-semibold leading-6 text-white">
                            Go to Lessons <FaArrowRightLong className="ml-1" />
                        </Link>
                    </div>
                </nav>
            </header>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden" role="dialog">
                    <div className="fixed inset-0 z-50"></div>
                    <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <div className="-m-1.5 p-1.5">
                                <Image src={logo} className="h-8 w-auto" alt="LearnLugha Logo" />
                            </div>
                            <button
                                type="button"
                                onClick={toggleMenu}
                                className="-m-2.5 rounded-md p-2.5 text-white"
                            >
                                <span className="sr-only">Close menu</span>
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    <Link
                                        href="/faq"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-700"
                                    >
                                        FAQ
                                    </Link>
                                    <Link
                                        href="/pricing"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-700"
                                    >
                                        Pricing
                                    </Link>
                                    <Link
                                        href="/about"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-700"
                                    >
                                        About
                                    </Link>
                                    <Link
                                        href="/privacy-policy"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-700"
                                    >
                                        Privacy Policy
                                    </Link>
                                </div>
                                <div className="py-6">
                                    <Link
                                        href="/home"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-700"
                                    >
                                        Go to Lessons
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Section */}
            <div className="relative isolate px-6 pt-14 lg:px-8 min-h-screen">
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#001aff] to-[#c689fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                    ></div>
                </div>

                <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                            Payment{" "}
                            <span className="whitespace-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
                                Successful!
                            </span>
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-400">
                            Thank you for your purchase. Your subscription is now active.
                        </p>

                        {error && <p className="text-red-500 mt-4">{error}</p>}

                        {loading ? (
                            <p className="text-white mt-6">Loading...</p>
                        ) : (
                            session && (
                                <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
                                    <p className="text-lg text-gray-400 mb-4">
                                        Thank you,{" "}
                                        <span className="text-white">{session.customer_details.email}</span>!
                                    </p>
                                    <p className="text-lg text-gray-400 mb-2">
                                        You have subscribed to:{" "}
                                        <span className="text-white">
                                            {session?.line_items?.data[0]?.price?.product?.name ?? "N/A"}
                                        </span>
                                    </p>
                                    <p className="text-lg text-gray-400">
                                        Total Amount Paid:{" "}
                                        <span className="text-white">
                                            ${(session.amount_total / 100).toFixed(2)} USD
                                        </span>
                                    </p>
                                </div>
                            )
                        )}

                        <div className="mt-10">
                            <Link href="/home" className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-indigo-500">
                                Go to Lessons
                            </Link>
                        </div>
                    </div>
                </div>

                <div
                    className="absolute inset-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#7b00ff] to-[#1100ff] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                    ></div>
                </div>
            </div>

            <footer className="">
                <p className="text-center text-gray-400">© 2024 LearnLugha. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SuccessPageContent />
        </Suspense>
    );
}