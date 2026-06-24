'use client'
import { authClient } from '@/lib/auth-client';
import { Droplet, LayoutGrid, LogOut, Pencil, User, UserCircle, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaGalacticRepublic } from 'react-icons/fa';
import { MdOutlinePublic, MdPublic } from 'react-icons/md';

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
                    router.push("/"); // redirect to login page
                },
            },
        });
    }

    useEffect(() => {
        if (!session?.user?.email) return;
        const loadData = async () => {
            const res = await fetch(`http://localhost:8000/allusers/${session.user.email}`);
            const data = await res.json();
            setUserData(data);

        };

        loadData();
    }, [session]);

    return (
        <div>
            <aside className="w-75 h-screen flex flex-col bg-black px-6 py-8 font-sans">

                {/* MAIN MENU SECTION */}
                <div className="mb-8">
                    <h3 className="text-[0.7rem] font-extrabold text-slate-400 tracking-[0.15em] uppercase mb-4 px-2">
                        Main Menu
                    </h3>
                    <nav className="flex flex-col gap-2">
                        {/* Active Item */}
                        <Link
                            href="/dashboard"
                            className={`flex items-center gap-4 px-4 py-3.5 ${pathName === "/dashboard" ? "bg-red-600 text-white" : "text-slate-500 hover:text-red-600"} rounded-2xl transition-transform active:scale-[0.98]`}
                        >
                            <LayoutGrid className="w-[1.35rem] h-[1.35rem]" strokeWidth={2.5} />
                            <span className="font-bold text-[1.05rem]">Dashboard</span>
                        </Link>

                        {/* Inactive Item */}
                        <Link
                            href="/dashboard/my-profile"
                            className={`flex items-center gap-4 px-4 py-3.5 ${pathName === "/dashboard/my-profile" ? "bg-red-600 text-white" : "text-slate-500 hover:text-red-600"} rounded-2xl transition-colors`}
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
                            href={`/dashboard/my-donation-requests?email=${session?.user?.email}`}
                            className={`flex items-center gap-4 px-4 py-3.5 ${pathName === "/dashboard/my-donation-requests" ? "bg-red-600 text-white" : "text-slate-500 hover:text-red-600"} text-slate-500 rounded-2xl transition-colors`}
                        >
                            <Droplet className="w-[1.35rem] h-[1.35rem]" strokeWidth={2} />
                            <span className="font-bold text-[1.05rem]">My Requests</span>
                        </Link>

                        <Link
                            href="/dashboard/create-donation-request"
                            className={`flex items-center gap-4 px-4 py-3.5 ${pathName === "/dashboard/create-donation-request" ? "bg-red-600 text-white" : "text-slate-500 hover:text-red-600"} text-slate-500 rounded-2xl transition-colors`}
                        >
                            <Pencil className="w-[1.35rem] h-[1.35rem]" strokeWidth={2} />
                            <span className="font-bold text-[1.05rem]">Create Request</span>
                        </Link>
                    </nav>
                </div>
                {/* MANAGEMENT SECTION */}
                <div className={`${userData.role === 'doner' ? 'hidden' : 'block'} mb-8`}>
                    <h3 className="text-[0.7rem] font-extrabold text-slate-400 tracking-[0.15em] uppercase mb-4 px-2">
                        Management
                    </h3>
                    <nav className="flex flex-col gap-2">
                        <Link
                            href={`/dashboard/allusers`}
                            className={`${userData.role === 'volunteer' ? 'hidden' : 'flex'} items-center gap-4 px-4 py-3.5 ${pathName === "/dashboard/allusers" ? "bg-red-600 text-white" : "text-slate-500 hover:text-red-600"} text-slate-500 rounded-2xl transition-colors`}
                        >
                            <Users className="w-[1.35rem] h-[1.35rem]" strokeWidth={2} />
                            <span className="font-bold text-[1.05rem]">All Users</span>
                        </Link>

                        <Link
                            href="/dashboard/public-requests"
                            className={`flex items-center gap-4 px-4 py-3.5 ${pathName === "/dashboard/public-requests" ? "bg-red-600 text-white" : "text-slate-500 hover:text-red-600"} text-slate-500 rounded-2xl transition-colors`}
                        >
                            <FaGalacticRepublic className='border-none' strokeWidth={2} />
                            <span className="font-bold text-[1.05rem]">Public Requests</span>
                        </Link>
                    </nav>
                </div>

                {/* Spacer to push bottom content down */}
                <div className="flex-1"></div>

                {/* BOTTOM SECTION (Profile & Logout) */}
                <div className="flex flex-col gap-3 pb-20">
                    {/* Profile Pill */}
                    <div className="flex items-center gap-3.5 p-3 rounded-2xl">
                        <div className='w-15 h-15 rounded-full border overflow-hidden'>
                            <Image width={0} height={0} sizes='100vw' style={{ width: '100%', height: '100%' }} src={userData?.image} alt='User Image' />

                        </div>

                        <div className="flex flex-col overflow-hidden">
                            <span className="text-[1.05rem] font-bold text-white truncate leading-tight">
                                Admin User
                            </span>
                            <span className="text-[0.85rem] text-slate-500 truncate mt-0.5">
                                {userData.email}
                            </span>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <button onClick={handleSingOut} className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-red-600 text-white hover:bg-red-400 rounded-2xl transition-colors font-bold text-[1.05rem]">
                        <LogOut className="w-5 h-5" strokeWidth={2.5} />
                        Logout
                    </button>
                </div>

            </aside>
        </div>
    );
};

export default DashboardSidebar;