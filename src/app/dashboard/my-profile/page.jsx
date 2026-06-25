'use client'
import React, { useEffect, useRef, useState } from 'react';
import {
    Pencil,
    CheckCircle2,
    MapPin,
    User,
    Lock,
    Droplet,
    SaveAll
} from 'lucide-react';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';
import toast, { Toaster } from 'react-hot-toast';
import { redirect } from 'next/navigation';

const notify = () => toast.success('Profile Updated');

const ProfileSettings = (req) => {
    const [userData, setUserData] = useState([]);
    const [editProfile, setEditProfile] = useState(false);

    const formRef = useRef();

    const {
        data: session,
        isPending,
        error
    } = authClient.useSession();

    if (!session && !isPending) {
        redirect('/login')
    }

    useEffect(() => {
        if (!session) return;
        const loadData = async () => {

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_LOCAL_URI}/allusers/${session.user.email}`
            );

            const data = await res.json();
            setUserData(data);
        };

        loadData();

    }, [session]);

    const handleButton = () => {
        setEditProfile(pre => !pre)
    };

    const handleEdit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const userDataEdit = Object.fromEntries(formData.entries());

        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URI}/allusers/${userData._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userDataEdit)
        });

        const responseUser = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URI}/user/${session?.user?.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: userDataEdit.name })
        });

        if (!editProfile) {
            notify()
        }
    }

    return (
        // Adjusted padding for mobile (p-4) and desktop (md:p-8)
        <form onSubmit={handleEdit} className="flex-1 overflow-auto w-full max-w-5xl mx-auto p-4 md:p-8 font-sans bg-black min-h-screen">
            <Toaster />

            {/* Header Section */}
            {/* Stack on mobile, row on sm screens */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
                <div>
                    <h1 className="text-[1.75rem] sm:text-[2rem] font-black tracking-tight leading-tight flex items-center">
                        <span className="text-white">Profile</span>
                        <span className="text-[#ed2547] ml-2">Settings</span>
                    </h1>
                    <p className="text-slate-500 text-[0.85rem] sm:text-[0.95rem] font-medium mt-1">
                        Manage your personal information and donor credentials.
                    </p>
                </div>

                <div className='flex gap-3 sm:gap-6 w-full sm:w-auto'>
                    <button
                        type="button"
                        onClick={() => setEditProfile(pre => !pre)}
                        className={`${editProfile ? 'flex' : 'hidden'} flex-1 sm:flex-none justify-center items-center gap-2.5 px-4 sm:px-6 py-2.5 bg-slate-400/50 text-white rounded-full font-bold text-[0.85rem] sm:text-[0.95rem] transition-colors`}
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        onClick={handleButton}
                        className="flex-1 sm:flex-none flex justify-center items-center gap-2 sm:gap-2.5 px-4 sm:px-6 py-2.5 bg-white border-2 border-red-50 text-[#ed2547] rounded-full font-bold text-[0.85rem] sm:text-[0.95rem] shadow-sm hover:bg-red-50 transition-colors"
                    >
                        {
                            editProfile ? <SaveAll className="w-4 h-4" strokeWidth={2.5} /> : <Pencil className="w-4 h-4" strokeWidth={2.5} />
                        }
                        {editProfile ? 'Update Profile' : 'Edit Profile'}
                    </button>
                </div>
            </div>

            {/* Main Profile Card */}
            <div className="bg-black rounded-3xl sm:rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-900 overflow-hidden">

                {/* Cover Photo Area with Dotted Pattern */}
                <div
                    className="h-32 sm:h-44 w-full bg-[#3d0814]"
                    style={{
                        backgroundImage: 'radial-gradient(#5a1622 1.5px, transparent 1.5px)',
                        backgroundSize: '16px 16px'
                    }}
                ></div>

                {/* Profile Info Overlay */}
                <div className="px-4 sm:px-10 relative flex justify-between">

                    {/* Avatar and Name */}
                    {/* Centered on mobile, left-aligned on sm screens */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-6 -mt-12 sm:-mt-16 relative z-10 w-full sm:w-auto">
                        <div className='w-24 h-24 sm:w-30 sm:h-30 rounded-full overflow-hidden border-4 border-black bg-gray-900 shrink-0'>
                            {userData?.image && (
                                <Image width={120} height={120} sizes='100vw' style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={userData?.image} alt='User Image' />
                            )}
                        </div>

                        <div className="pt-2 sm:pt-20 flex flex-col items-center sm:items-start w-full">
                            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto text-center sm:text-left">
                                <h2 className="text-[1.5rem] sm:text-[2rem] font-black text-white leading-none">
                                    {userData.name || 'Loading...'}
                                </h2>
                                <span className={`flex items-center gap-1.5 px-3 py-1 ${userData.status === 'block' ? 'bg-red-300 text-red-500' : 'bg-[#e8f5ed] text-[#129148]'} text-[0.6rem] sm:text-[0.65rem] font-extrabold uppercase tracking-wide rounded-full border border-green-100`}>
                                    <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={3} />
                                    {
                                        userData.status === 'block' ? 'Blocked' : 'Active Donor'
                                    }
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5 mt-2.5 text-slate-500 font-semibold text-[0.85rem] sm:text-[0.95rem]">
                                <MapPin className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#ed2547]" strokeWidth={2.5} />
                                {userData.district || '-'}, {userData.upazila || '-'}
                            </div>
                        </div>
                    </div>

                    {/* Blood Group Floating Badge */}
                    {/* Scaled down on mobile to prevent overlapping */}
                    <div className="absolute -top-10 sm:-top-11.25 right-4 sm:right-10 bg-[#fdf2f3] border border-red-100 rounded-2xl sm:rounded-3xl p-2 sm:p-4 flex flex-col items-center justify-center w-20 sm:w-[130px] shadow-sm z-10">
                        <span className="text-[0.5rem] sm:text-[0.6rem] font-black text-[#e85c6f] tracking-[0.15em] uppercase sm:mb-0.5">
                            {userData.bloodGroup || 'A+'}
                        </span>
                        <span className="text-3xl sm:text-[2.75rem] font-black text-[#ed2547] leading-none drop-shadow-sm">
                            {userData.bloodGroup || 'A+'}
                        </span>
                    </div>
                </div>

                {/* Form Details Grid */}
                <div className="px-4 sm:px-10 pt-8 sm:pt-12 pb-10 sm:pb-14 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">

                    {/* Left Column (Forms) */}
                    <div className="col-span-1 lg:col-span-2 space-y-8 sm:space-y-10">

                        {/* Personal Information Section */}
                        <section>
                            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                                <div className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 bg-[#fdf2f3]/30 text-[#ed2547] rounded-xl shrink-0">
                                    <User className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                                </div>
                                <h3 className="text-lg sm:text-xl font-black text-white">Personal Information</h3>
                            </div>

                            {/* Single col on mobile, 2 cols on sm screens */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[0.65rem] font-extrabold text-slate-400 uppercase tracking-widest px-1">
                                        Full Name
                                    </label>
                                    <input defaultValue={userData.name} name='name' readOnly={!editProfile} className="bg-[#f8f9fa]/20 focus:outline-1 outline-red-600 px-4 py-3.5 rounded-xl text-[0.95rem] font-bold text-white w-full" />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-[0.65rem] font-extrabold text-slate-400 uppercase tracking-widest px-1">
                                        Email (Fixed)
                                    </label>
                                    <div className="bg-[#f8f9fa]/20 px-4 py-3.5 rounded-xl text-[0.95rem] font-bold text-slate-400 flex justify-between items-center w-full truncate">
                                        <span className="truncate pr-2">{userData.email}</span>
                                        <Lock className="w-4 h-4 text-slate-500 shrink-0" strokeWidth={2} />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Address Details Section */}
                        <section>
                            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                                <div className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 bg-[#fdf2f3]/30 text-[#ed2547] rounded-xl shrink-0">
                                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                                </div>
                                <h3 className="text-lg sm:text-xl font-black text-white">Address Details</h3>
                            </div>

                            {/* Single col on mobile, 2 cols on sm screens */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[0.65rem] font-extrabold text-slate-400 uppercase tracking-widest px-1">
                                        District
                                    </label>
                                    <input defaultValue={userData.district} name='district' readOnly={!editProfile} className="bg-[#f8f9fa]/20 focus:outline-1 outline-red-600 px-4 py-3.5 rounded-xl text-[0.95rem] font-bold text-white w-full" />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-[0.65rem] font-extrabold text-slate-400 uppercase tracking-widest px-1">
                                        Upazila
                                    </label>
                                    <input defaultValue={userData.upazila} name='upazila' readOnly={!editProfile} className="bg-[#f8f9fa]/20 focus:outline-1 outline-red-600 px-4 py-3.5 rounded-xl text-[0.95rem] font-bold text-white w-full" />
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Right Column (Medical Profile) */}
                    <div className="col-span-1">
                        <div className="bg-black border border-gray-800 lg:border-none rounded-[2rem] p-5 sm:p-7 h-full flex flex-col gap-6">

                            <div className="flex items-center gap-3 sm:gap-4 mb-2">
                                <div className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 bg-white/30 text-[#ed2547] rounded-xl shadow-sm shrink-0">
                                    <Droplet className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                                </div>
                                <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
                                    Medical<br className="hidden sm:block" /> { /* Keep br on desktop, inline on mobile */}
                                    <span className="sm:hidden"> </span>Profile
                                </h3>
                            </div>

                            {/* Blood Group Info Box */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[0.65rem] font-extrabold text-slate-400 uppercase tracking-widest px-1">
                                    Blood Group
                                </label>
                                <input defaultValue={userData.bloodGroup} name='bloodGroup' readOnly={!editProfile} className="focus:outline-1 outline-red-600 px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl bg-white/20 text-lg sm:text-xl font-black text-[#ed2547] w-full" />
                            </div>

                            {/* Eligibility Card */}
                            <div className="bg-black p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-800 mt-2">
                                <h4 className="font-black text-white text-[1rem] sm:text-[1.05rem] mb-1.5 sm:mb-2 leading-tight">
                                    Eligible to<br className="hidden sm:block" /> Donate
                                </h4>
                                <p className="text-[0.8rem] sm:text-[0.85rem] font-medium text-slate-500 leading-relaxed">
                                    Your account is in good standing. You are ready to save lives.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </form>
    );
};

export default ProfileSettings;