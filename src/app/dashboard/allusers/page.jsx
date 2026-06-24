'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';


export default function UserManagementSection() {
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [usersData, setUsersData] = useState([]);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const dataLoad = async () => {
            const allUsersFetch = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URI}/allusers`);
            const allUsers = await allUsersFetch.json();
            setUsersData(allUsers)

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
    }





    return (
        <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center font-sans text-gray-900">

            {/* Header Section */}
            <div className="w-full max-w-6xl mb-8">
                <h1 className="text-4xl font-extrabold tracking-tight mb-2">
                    <span className="text-gray-900">User</span> <span className="text-rose-500">Management</span>
                </h1>
                <p className="text-gray-500 text-sm font-medium">
                    Oversee community roles, statuses, and permissions.
                </p>
            </div>

            {/* Table Section */}
            <div className="w-full max-w-6xl bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-[11px] font-bold tracking-[0.1em] text-gray-400 uppercase border-b border-gray-50">
                            <th className="px-8 py-6 w-16">#</th>
                            <th className="px-6 py-6">User Profile</th>
                            <th className="px-6 py-6">Email Address</th>
                            <th className="px-6 py-6">Current Role</th>
                            <th className="px-6 py-6">Status</th>
                            <th className="px-8 py-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersData.map((user, idx) => (
                            <tr key={user._id} className="hover:bg-gray-50/50 transition-colors group border-b border-gray-50 last:border-0">
                                <td className="px-8 py-5 text-sm text-gray-400 font-medium">
                                    {idx + 1}
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-4">
                                        {/* Placeholder Avatar */}
                                        <div className="w-10 h-10 rounded-[0.8rem] bg-gray-100 flex items-center justify-center text-gray-500 font-bold overflow-hidden shadow-inner">
                                            <Image width={0} height={0} sizes='100vw' style={{ width: '100%', height: '100%' }} src={user?.image} alt='User Image' />

                                        </div>
                                        <span className="font-bold text-gray-900 text-sm">{user.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                        <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        {user.email}
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    {user.role === 'doner' && (
                                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider bg-emerald-50 text-black">
                                            DONER
                                        </span>
                                    )}
                                    {user.role === 'admin' && (
                                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider bg-emerald-50 text-purple-500">
                                            ADMIN
                                        </span>
                                    )}
                                    {user.role === 'volunteer' && (
                                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider bg-emerald-50 text-pink-500">
                                            VOLUNTEER
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-5">
                                    {user.status === 'active' && (
                                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider bg-emerald-50 text-emerald-600">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                            ACTIVE
                                        </span>
                                    )}
                                    {user.status === 'block' && (
                                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider bg-emerald-50 text-red-500">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                            BLOCK
                                        </span>
                                    )}
                                </td>
                                <td className="px-8 py-5 text-right relative">
                                    <button
                                        onClick={() => toggleDropdown(user._id)}
                                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                                        </svg>
                                    </button>

                                    {/* Dropdown Menu */}
                                    {openDropdownId === user._id && (
                                        <div ref={dropdownRef} className="absolute right-14 -top-10 w-44 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 z-10 py-2 overflow-hidden"
                                        >
                                            {
                                                user.status === 'active' && (
                                                    <button onClick={() => handleUsers(user._id, 'block', user.role)} className="w-full px-4 py-2.5 flex items-center gap-3 text-sm font-semibold text-red-500 bg-emerald-50/50 hover:bg-emerald-50 transition-colors">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                        </svg>
                                                        Block User
                                                    </button>
                                                )
                                            }
                                            {
                                                user.status === 'block' && (
                                                    <button onClick={() => handleUsers(user._id, 'active', user.role)} className="w-full px-4 py-2.5 flex items-center gap-3 text-sm font-semibold text-emerald-600 bg-emerald-50/50 hover:bg-emerald-50 transition-colors">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                        </svg>
                                                        Unblock User
                                                    </button>
                                                )
                                            }
                                            {
                                                user.role === 'volunteer' && (
                                                    <button onClick={() => handleUsers(user._id, user.status, 'admin')} className="w-full px-4 py-2.5 flex items-center gap-3 text-sm font-semibold text-purple-500 hover:bg-rose-50 transition-colors">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                                        </svg>
                                                        Make Admin
                                                    </button>
                                                )
                                            }
                                            {
                                                user.role === 'doner' && (
                                                    <button onClick={() => handleUsers(user._id, user.status, 'volunteer')} className="w-full px-4 py-2.5 flex items-center gap-3 text-sm font-semibold text-pink-500 hover:bg-rose-50 transition-colors">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                                        </svg>
                                                        Make Volunteer
                                                    </button>
                                                )
                                            }
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}