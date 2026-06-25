import { auth } from '@/lib/auth';
import { Droplets } from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation'; 
import React from 'react';

const DashboardNavbar = async () => {
    // 1. Get the session
    const session = await auth.api.getSession({
        headers: await headers()
    });

    // 2. Protect the route: If no session, redirect to login
    if (!session?.user?.email) {
        redirect('/login'); 
    }

    // 3. Fetch user data safely
    let singleUser = null;
    try {
        const singleUserFetch = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URI}/allusers/${session.user.email}`);
        
        if (singleUserFetch.ok) {
            singleUser = await singleUserFetch.json();
        } else {
            console.error("Failed to fetch user data from backend.");
        }
    } catch (error) {
        console.error("Network error while fetching user:", error);
    }

    // Safely extract the role, default to 'GUEST' if backend fails
    const userRole = singleUser?.role?.toUpperCase() || 'GUEST';

    return (
        // Adjusted padding and height for smaller screens
        <header className="sticky top-0 flex items-center px-4 md:px-10 w-full min-h-[4.5rem] md:h-24 bg-black border-b border-gray-100 font-sans z-50">
            
            {/* Logo Section */}
            <Link href='/' className="flex items-center gap-1.5 md:gap-2 cursor-pointer shrink-0">
                <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-50 border border-red-100 text-red-600">
                    <Droplets className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                    <span className="text-red-600">Blood</span>
                    {/* Hide "Bridge" on very small screens to save space if needed, otherwise just scale text */}
                    <span className="text-white hidden sm:inline-block">Bridge</span>
                </h1>
            </Link>

            {/* Right Dashboard Header Section */}
            {/* Switched to end alignment on mobile, space-between on desktop */}
            <div className="flex-1 flex items-center justify-end md:justify-between pl-4 md:px-8">

                {/* Title & Subtitle */}
                {/* Scaled text down for mobile and aligned text right on mobile */}
                <div className="flex flex-col justify-center text-right md:text-left">
                    <h1 className="text-lg sm:text-xl md:text-[1.75rem] font-black text-white leading-none mb-1 md:mb-1.5 tracking-tight">
                        Dashboard
                    </h1>
                    <p className="text-[0.6rem] md:text-[0.7rem] font-extrabold text-slate-400 tracking-[0.1em] md:tracking-[0.15em] uppercase">
                        Welcome<span className="hidden sm:inline"> Back</span>, {userRole}
                    </p>
                </div>

                {/* User Role Indicator */}
                {/* Hidden on mobile to prevent crowding, visible on medium screens and up */}
                <div className="hidden md:flex items-center">
                    <span className="text-[#ed2547] font-black text-[1.1rem] uppercase tracking-wide">
                        {userRole}
                    </span>
                </div>

            </div>

        </header>
    );
};

export default DashboardNavbar;