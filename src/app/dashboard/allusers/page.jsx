'use client'
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const notifyErr = (msg) => toast.error(msg);
const notifySucc = (msg) => toast.success(msg);

export default function UserManagementSection() {
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [usersData, setUsersData] = useState([]);
    const dropdownRef = useRef(null);

    const {
        data: session,
        isPending,
        error
    } = authClient.useSession();

    if (!session && !isPending) {
        redirect('/login')
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const dataLoad = async () => {
            try {
                const allUsersFetch = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URI}/allusers`);
                if (allUsersFetch.ok) {
                    const allUsers = await allUsersFetch.json();
                    setUsersData(Array.isArray(allUsers) ? allUsers : []);
                }
            } catch (error) {
                console.error("Failed to load users:", error);
            }
        }
        dataLoad();

        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdownId(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);

    }, []);

    const toggleDropdown = (id) => {
        setOpenDropdownId(prev => prev === id ? null : id);
    };

    const handleUsers = async (id, status, role) => {
        const userData = {
            status: status,
            role: role
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URI}/allusers/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                setUsersData(prev =>
                    prev.map(user =>
                        user._id === id
                            ? { ...user, status, role }
                            : user
                    )
                );
            }
        } catch (error) {
            console.error("Failed to update user:", error);
            notifyErr('Update failed. Please try again.');
        }
    }


    return (
        // Adjusted padding for mobile (p-4) vs desktop (sm:p-8)
        <div className="min-h-screen bg-black p-4 sm:p-8 flex flex-col items-center font-sans text-gray-900">
            <Toaster />

            {/* Header Section */}
            <div className="w-full max-w-6xl mb-6 sm:mb-8 text-center sm:text-left">
                {/* Scaled text for smaller screens */}
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
                    <span className="text-white">User</span> <span className="text-rose-500">Management</span>
                </h1>
                <p className="text-gray-500 text-xs sm:text-sm font-medium">
                    Oversee community roles, statuses, and permissions.
                </p>
            </div>

            {/* Table Section */}
            <div className="w-full max-w-6xl bg-black border border-gray-900 rounded-2xl sm:rounded-[2rem] shadow-sm overflow-hidden">
                {/* Overflow wrapper to enable horizontal scrolling on mobile */}
                <div className="w-full overflow-x-auto pb-10 sm:pb-0">
                    {/* min-w-[900px] ensures the table never shrinks past readability, triggering scroll instead */}
                    <table className="w-full min-w-[900px] text-left border-collapse">
                        <thead>
                            <tr className="text-[10px] sm:text-[11px] font-bold tracking-[0.1em] text-gray-400 uppercase border-b border-gray-900">
                                <th className="px-4 sm:px-8 py-4 sm:py-6 w-16">#</th>
                                <th className="px-4 sm:px-6 py-4 sm:py-6">User Profile</th>
                                <th className="px-4 sm:px-6 py-4 sm:py-6">Email Address</th>
                                <th className="px-4 sm:px-6 py-4 sm:py-6">Current Role</th>
                                <th className="px-4 sm:px-6 py-4 sm:py-6">Status</th>
                                <th className="px-4 sm:px-8 py-4 sm:py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersData?.map((user, idx) => (
                                <tr key={user?._id} className="transition-colors group last:border-0 border-b border-gray-900/50 hover:bg-white/5">
                                    <td className="px-4 sm:px-8 py-4 sm:py-5 text-sm text-gray-400 font-medium">
                                        {idx + 1}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 sm:py-5">
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            {/* Avatar */}
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-[0.8rem] bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-500 font-bold overflow-hidden shrink-0">
                                                {user?.image && (
                                                    <Image width={40} height={40} sizes='100vw' style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={user?.image} alt='User Image' />
                                                )}
                                            </div>
                                            <span className="font-bold text-white text-xs sm:text-sm">{user?.name || 'Unknown User'}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 sm:py-5">
                                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 font-medium">
                                            <svg className="w-4 h-4 text-gray-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <span className="truncate max-w-[150px] sm:max-w-none">{user.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 sm:py-5">
                                        {user.role === 'doner' && (
                                            <span className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider bg-white/10 text-white border border-white/10">
                                                DONOR
                                            </span>
                                        )}
                                        {user.role === 'admin' && (
                                            <span className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                                ADMIN
                                            </span>
                                        )}
                                        {user.role === 'volunteer' && (
                                            <span className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider bg-pink-500/10 text-pink-400 border border-pink-500/20">
                                                VOLUNTEER
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 sm:py-5">
                                        {user.status === 'active' && (
                                            <span className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                                ACTIVE
                                            </span>
                                        )}
                                        {user.status === 'block' && (
                                            <span className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider bg-red-500/10 text-red-400 border border-red-500/20">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                                                BLOCKED
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 sm:px-8 py-4 sm:py-5 text-right relative">
                                        <button
                                            onClick={() => toggleDropdown(user._id)}
                                            className="p-2 text-gray-500 hover:text-white rounded-lg hover:bg-gray-800 transition-colors focus:outline-none"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                                            </svg>
                                        </button>

                                        {/* Dropdown Menu - Adjusted positioning to ensure it doesn't clip */}
                                        {openDropdownId === user._id && (
                                            <div ref={dropdownRef} className="absolute right-8 sm:right-14 top-10 sm:-top-4 w-44 bg-gray-900 rounded-2xl shadow-xl border border-gray-700 z-50 py-2 overflow-hidden text-left"
                                            >
                                                {user.status === 'active' && (
                                                    <button onClick={() => { handleUsers(user._id, 'block', user.role); notifyErr('User Blocked!'); setOpenDropdownId(null); }} className="w-full px-4 py-2.5 flex items-center gap-3 text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-colors">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                        </svg>
                                                        Block User
                                                    </button>
                                                )}
                                                {user.status === 'block' && (
                                                    <button onClick={() => { handleUsers(user._id, 'active', user.role); notifySucc('User Unblocked'); setOpenDropdownId(null); }} className="w-full px-4 py-2.5 flex items-center gap-3 text-sm font-semibold text-emerald-400 hover:bg-emerald-500/10 transition-colors">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                        </svg>
                                                        Unblock User
                                                    </button>
                                                )}
                                                {user.role === 'volunteer' && (
                                                    <button onClick={() => { handleUsers(user._id, user.status, 'admin'); notifySucc('User assigned as Admin'); setOpenDropdownId(null); }} className="w-full px-4 py-2.5 flex items-center gap-3 text-sm font-semibold text-purple-400 hover:bg-purple-500/10 transition-colors">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                                        </svg>
                                                        Make Admin
                                                    </button>
                                                )}
                                                {user.role === 'doner' && (
                                                    <button onClick={() => { handleUsers(user._id, user.status, 'volunteer'); notifySucc('User assigned as Volunteer'); setOpenDropdownId(null); }} className="w-full px-4 py-2.5 flex items-center gap-3 text-sm font-semibold text-pink-400 hover:bg-pink-500/10 transition-colors">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                                        </svg>
                                                        Make Volunteer
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}