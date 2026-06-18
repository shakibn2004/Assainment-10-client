import { Droplet, LayoutGrid, LogOut, Pencil, UserCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const DashboardSidebar = () => {
    return (
        <div>
            <aside className="w-75 h-screen flex flex-col bg-white border-r border-gray-100 px-6 py-8 font-sans">

                {/* MAIN MENU SECTION */}
                <div className="mb-8">
                    <h3 className="text-[0.7rem] font-extrabold text-slate-400 tracking-[0.15em] uppercase mb-4 px-2">
                        Main Menu
                    </h3>
                    <nav className="flex flex-col gap-2">
                        {/* Active Item */}
                        <Link
                            href="/dashboard"
                            className={`flex items-center gap-4 px-4 py-3.5 hover:bg-[#ed2547] hover:text-white text-slate-500 rounded-2xl shadow-sm shadow-red-100 transition-transform active:scale-[0.98]`}
                        >
                            <LayoutGrid className="w-[1.35rem] h-[1.35rem]" strokeWidth={2.5} />
                            <span className="font-bold text-[1.05rem]">Dashboard</span>
                        </Link>

                        {/* Inactive Item */}
                        <Link
                            href="/dashboard/my-profile"
                            className="flex items-center gap-4 px-4 py-3.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-2xl transition-colors"
                        >
                            <UserCircle className="w-[1.35rem] h-[1.35rem]" strokeWidth={2} />
                            <span className="font-bold text-[1.05rem]">My Profile</span>
                        </Link>
                    </nav>
                </div>

                {/* DONATIONS SECTION */}
                <div className="mb-8">
                    <h3 className="text-[0.7rem] font-extrabold text-slate-400 tracking-[0.15em] uppercase mb-4 px-2">
                        Donations
                    </h3>
                    <nav className="flex flex-col gap-2">
                        <Link
                            href="/dashboard/my-donation-requests"
                            className="flex items-center gap-4 px-4 py-3.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-2xl transition-colors"
                        >
                            <Droplet className="w-[1.35rem] h-[1.35rem]" strokeWidth={2} />
                            <span className="font-bold text-[1.05rem]">My Requests</span>
                        </Link>

                        <Link
                            href="/dashboard/create-donation-request"
                            className="flex items-center gap-4 px-4 py-3.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-2xl transition-colors"
                        >
                            <Pencil className="w-[1.35rem] h-[1.35rem]" strokeWidth={2} />
                            <span className="font-bold text-[1.05rem]">Create Request</span>
                        </Link>
                    </nav>
                </div>

                {/* Spacer to push bottom content down */}
                <div className="flex-1"></div>

                {/* BOTTOM SECTION (Profile & Logout) */}
                <div className="mt-auto flex flex-col gap-3">
                    {/* Profile Pill */}
                    <div className="flex items-center gap-3.5 p-3 bg-slate-50 rounded-2xl">
                        <img
                            src="https://i.pravatar.cc/150?img=11" // Replace with actual user image
                            alt="Admin User Avatar"
                            className="w-11 h-11 rounded-full object-cover bg-gray-200"
                        />
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-[1.05rem] font-bold text-slate-900 truncate leading-tight">
                                Admin User
                            </span>
                            <span className="text-[0.85rem] text-slate-500 truncate mt-0.5">
                                shakibn2004@gmail.com
                            </span>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <button className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-[#ffe9ec] text-[#ed2547] hover:bg-[#ffd4db] rounded-2xl transition-colors font-bold text-[1.05rem]">
                        <LogOut className="w-5 h-5" strokeWidth={2.5} />
                        Logout
                    </button>
                </div>

            </aside>
        </div>
    );
};

export default DashboardSidebar;