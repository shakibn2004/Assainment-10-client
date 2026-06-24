import { auth } from '@/lib/auth';
import { Droplets } from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';
import React from 'react';

const DashboardNavbar = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    const singleUserFetch = await fetch(`http://localhost:8000/allusers/${session?.user?.email}`);
    const singleUser = await singleUserFetch.json();

    return (
        <header className="sticky top-0 flex px-10 w-full h-22.5 bg-black border-b border-gray-100 font-sans">

            {/* Logo Section */}
            <Link href='/' className="flex items-center gap-2 cursor-pointer">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-50 border border-red-100 text-red-600">
                    <Droplets className="w-6 h-6" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight">
                    <span className="text-red-600">Blood</span>
                    <span className="text-white">Bridge</span>
                </h1>
            </Link>

            {/* Right Dashboard Header Section */}
            <div className="flex-1 flex items-center justify-between px-8">

                {/* Title & Subtitle */}
                <div className="flex flex-col justify-center">
                    <h1 className="text-[1.75rem] font-black text-white leading-none mb-1.5 tracking-tight">
                        Dashboard
                    </h1>
                    <p className="text-[0.7rem] font-extrabold text-slate-400 tracking-[0.15em] uppercase">
                        Welcome Back,
                        {
                            singleUser.role === 'admin' && 'ADMIN'
                        }
                        {
                            singleUser.role === 'volunteer' && 'VOLUNTEER'
                        }
                        {
                            singleUser.role === 'doner' && 'DONER'
                        }
                    </p>
                </div>

                {/* User Role Indicator */}
                <div className="flex items-center">
                    <span className="text-[#ed2547] font-black text-[1.1rem] uppercase tracking-wide">
                        {
                            singleUser.role === 'admin' && 'ADMIN'
                        }
                        {
                            singleUser.role === 'volunteer' && 'VOLUNTEER'
                        }
                        {
                            singleUser.role === 'doner' && 'DONER'
                        }
                    </span>
                </div>

            </div>

        </header>
    );
};

export default DashboardNavbar;