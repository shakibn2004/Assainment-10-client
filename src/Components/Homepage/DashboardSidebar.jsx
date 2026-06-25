'use client'
import { authClient } from '@/lib/auth-client';
import { Droplet, LayoutGrid, LogOut, Pencil, UserCircle, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaGalacticRepublic } from 'react-icons/fa';

import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast.success('Sign Out!');

const DashboardSidebar = () => {
    const [userData, setUserData] = useState([])
    const pathName = usePathname();

    const {
        data: session,
        isPending,
        error
    } = authClient.useSession();

    const router = useRouter()
    
    // user signout
    const handleSingOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login"); // redirect to login page
                },
            },
        });
        notify()
    }

    useEffect(() => {
        if (!session?.user?.email) return;
        const loadData = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URI}/allusers/${session.user.email}`);
            const data = await res.json();
            setUserData(data);
        };

        loadData();
    }, [session]);

    return (
        // Hide completely on mobile (handled by MobileMenu), show on tablet and up
        <div className="hidden md:block shrink-0">
            {/* Added responsive widths, padding, sticky positioning, and overflow */}
            <aside className="md:w-64 lg:w-75 h-screen sticky top-0 flex flex-col bg-black md:px-4 lg:px-6 py-8 font-sans border-r border-gray-900 overflow-y-auto overflow-x-hidden custom-scrollbar">
                <Toaster />
                
                {/* MAIN MENU SECTION */}
                <div className="mb-6 lg:mb-8">
                    <h3 className="text-[0.65rem] lg:text-[0.7rem] font-extrabold text-slate-400 tracking-[0.15em] uppercase mb-3 lg:mb-4 px-2">
                        Main Menu
                    </h3>
                    <nav className="flex flex-col gap-1.5 lg:gap-2">
                        <Link
                            href="/dashboard"
                            className={`flex items-center gap-3 lg:gap-4 px-3 lg:px-4 py-3 lg:py-3.5 ${pathName === "/dashboard" ? "bg-red-600 text-white" : "text-slate-500 hover:text-red-600"} rounded-xl lg:rounded-2xl transition-transform active:scale-[0.98]`}
                        >
                            <LayoutGrid className="w-5 h-5 lg:w-[1.35rem] lg:h-[1.35rem]" strokeWidth={2.5} />
                            <span className="font-bold text-[0.95rem] lg:text-[1.05rem]">Dashboard</span>
                        </Link>

                        <Link
                            href="/dashboard/my-profile"
                            className={`flex items-center gap-3 lg:gap-4 px-3 lg:px-4 py-3 lg:py-3.5 ${pathName === "/dashboard/my-profile" ? "bg-red-600 text-white" : "text-slate-500 hover:text-red-600"} rounded-xl lg:rounded-2xl transition-colors`}
                        >
                            <UserCircle className="w-5 h-5 lg:w-[1.35rem] lg:h-[1.35rem]" strokeWidth={2} />
                            <span className="font-bold text-[0.95rem] lg:text-[1.05rem]">My Profile</span>
                        </Link>
                    </nav>
                </div>

                {/* DONATIONS SECTION */}
                <div className="mb-6 lg:mb-8">
                    <h3 className="text-[0.65rem] lg:text-[0.7rem] font-extrabold text-slate-400 tracking-[0.15em] uppercase mb-3 lg:mb-4 px-2">
                        Donations
                    </h3>
                    <nav className="flex flex-col gap-1.5 lg:gap-2">
                        <Link
                            href={`/dashboard/my-donation-requests?email=${session?.user?.email}`}
                            className={`flex items-center gap-3 lg:gap-4 px-3 lg:px-4 py-3 lg:py-3.5 ${pathName === "/dashboard/my-donation-requests" ? "bg-red-600 text-white" : "text-slate-500 hover:text-red-600"} rounded-xl lg:rounded-2xl transition-colors`}
                        >
                            <Droplet className="w-5 h-5 lg:w-[1.35rem] lg:h-[1.35rem]" strokeWidth={2} />
                            <span className="font-bold text-[0.95rem] lg:text-[1.05rem]">My Requests</span>
                        </Link>

                        <Link
                            href="/dashboard/create-donation-request"
                            className={`flex items-center gap-3 lg:gap-4 px-3 lg:px-4 py-3 lg:py-3.5 ${pathName === "/dashboard/create-donation-request" ? "bg-red-600 text-white" : "text-slate-500 hover:text-red-600"} rounded-xl lg:rounded-2xl transition-colors`}
                        >
                            <Pencil className="w-5 h-5 lg:w-[1.35rem] lg:h-[1.35rem]" strokeWidth={2} />
                            <span className="font-bold text-[0.95rem] lg:text-[1.05rem]">Create Request</span>
                        </Link>
                    </nav>
                </div>

                {/* MANAGEMENT SECTION */}
                <div className={`${userData.role === 'doner' ? 'hidden' : 'block'} mb-6 lg:mb-8`}>
                    <h3 className="text-[0.65rem] lg:text-[0.7rem] font-extrabold text-slate-400 tracking-[0.15em] uppercase mb-3 lg:mb-4 px-2">
                        Management
                    </h3>
                    <nav className="flex flex-col gap-1.5 lg:gap-2">
                        <Link
                            href={`/dashboard/allusers`}
                            className={`${userData.role === 'volunteer' ? 'hidden' : 'flex'} items-center gap-3 lg:gap-4 px-3 lg:px-4 py-3 lg:py-3.5 ${pathName === "/dashboard/allusers" ? "bg-red-600 text-white" : "text-slate-500 hover:text-red-600"} rounded-xl lg:rounded-2xl transition-colors`}
                        >
                            <Users className="w-5 h-5 lg:w-[1.35rem] lg:h-[1.35rem]" strokeWidth={2} />
                            <span className="font-bold text-[0.95rem] lg:text-[1.05rem]">All Users</span>
                        </Link>

                        <Link
                            href="/dashboard/public-requests"
                            className={`flex items-center gap-3 lg:gap-4 px-3 lg:px-4 py-3 lg:py-3.5 ${pathName === "/dashboard/public-requests" ? "bg-red-600 text-white" : "text-slate-500 hover:text-red-600"} rounded-xl lg:rounded-2xl transition-colors`}
                        >
                            <FaGalacticRepublic className='w-5 h-5 lg:w-[1.35rem] lg:h-[1.35rem] border-none' strokeWidth={2} />
                            <span className="font-bold text-[0.95rem] lg:text-[1.05rem]">Public Requests</span>
                        </Link>
                    </nav>
                </div>

                {/* Spacer to push bottom content down */}
                <div className="flex-1 min-h-[2rem]"></div>

                {/* BOTTOM SECTION (Profile & Logout) */}
                <div className="flex flex-col gap-3 pb-6 lg:pb-10">
                    {/* Profile Pill */}
                    <div className="flex items-center gap-2 lg:gap-3.5 p-2 lg:p-3 rounded-2xl bg-white/5 border border-white/10">
                        <div className='w-10 h-10 lg:w-15 lg:h-15 rounded-full border border-gray-700 overflow-hidden shrink-0 bg-gray-900'>
                            {userData?.image && (
                                <Image width={100} height={100} style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={userData?.image} alt='User Image' />
                            )}
                        </div>

                        <div className="flex flex-col overflow-hidden w-full pr-2">
                            <span className="text-[0.9rem] lg:text-[1.05rem] font-bold text-white truncate leading-tight">
                                {userData?.name || 'Loading...'}
                            </span>
                            <span className="text-[0.75rem] lg:text-[0.85rem] text-slate-500 truncate mt-0.5">
                                {userData?.email || '...'}
                            </span>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <button onClick={handleSingOut} className="flex items-center justify-center gap-2 lg:gap-2.5 w-full py-3 lg:py-3.5 bg-red-600 text-white hover:bg-red-500 rounded-xl lg:rounded-2xl transition-colors font-bold text-[0.95rem] lg:text-[1.05rem]">
                        <LogOut className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={2.5} />
                        Logout
                    </button>
                </div>

            </aside>
        </div>
    );
};

export default DashboardSidebar;