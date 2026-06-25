'use client'
import { authClient } from '@/lib/auth-client';
import { Droplets, Menu } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const DashboardNavbar = ({ openSidebar, setOpenSidebar }) => {

    // Initialize as null or an object, not an array, since it's a single user
    const [singleUser, setSingleUser] = useState(null);

    const {
        data: session,
        isPending,
        error
    } = authClient.useSession();

    useEffect(() => {
        // 1. Wait until session exists before trying to fetch
        if (!session?.user?.email) return;

        const handleServer = async () => {
            try {
                const singleUserFetch = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URI}/allusers/${session.user.email}`);

                if (singleUserFetch.ok) {
                    // 2. Added 'const' here (it was missing)
                    const singleUserData = await singleUserFetch.json();
                    setSingleUser(singleUserData);
                } else {
                    console.error("Failed to fetch user data from backend.");
                }
            } catch (error) {
                console.error("Network error while fetching user:", error);
            }
        }
        handleServer();

    }, [session]); // 3. Added session to the dependency array

    // 4. Safely extract the role, default to 'GUEST' while loading
    const userRole = singleUser?.role || 'GUEST';

    return (
        <header className="sticky top-0 flex items-center px-4 md:px-10 w-full min-h-[4.5rem] md:h-24 bg-black border-b border-gray-100 font-sans z-50">
            {/* Menu icon */}
            <div onClick={() => setOpenSidebar(prev => !prev)} className='mx-2 md:hidden'>
                <Menu color='white' />
            </div>
            {/* Logo Section */}
            <Link href='/' className="flex items-center gap-1.5 md:gap-2 cursor-pointer shrink-0">
                <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-50 border border-red-100 text-red-600">
                    <Droplets className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                    <span className="text-red-600">Blood</span>
                    <span className="text-white hidden sm:inline-block">Bridge</span>
                </h1>
            </Link>

            {/* Right Dashboard Header Section */}
            <div className="flex-1 flex items-center justify-end md:justify-between pl-4 md:px-8">

                {/* Title & Subtitle */}
                <div className="flex flex-col justify-center text-right md:text-left">
                    <h1 className="text-lg sm:text-xl md:text-[1.75rem] font-black text-white leading-none mb-1 md:mb-1.5 tracking-tight">
                        Dashboard
                    </h1>
                    <p className="text-[0.6rem] md:text-[0.7rem] font-extrabold text-slate-400 tracking-[0.1em] md:tracking-[0.15em] uppercase">
                        {/* 5. Changed to use the fetched userRole */}
                        Welcome<span className="hidden sm:inline"> Back</span>, {userRole}
                    </p>
                </div>

                {/* User Role Indicator */}
                <div className="hidden md:flex items-center">
                    <span className="text-[#ed2547] font-black text-[1.1rem] uppercase tracking-wide">
                        {/* 5. Changed to use the fetched userRole */}
                        {userRole}
                    </span>
                </div>

            </div>

        </header>
    );
};

export default DashboardNavbar;