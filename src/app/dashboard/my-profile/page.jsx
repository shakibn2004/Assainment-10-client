'use client'
import React, { useEffect, useState } from 'react';
import {
    Pencil,
    CheckCircle2,
    MapPin,
    User,
    Lock,
    Droplet
} from 'lucide-react';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';

const ProfileSettings = (req) => {
    const [userData, setUserData] = useState([]);
    const [editProfile, setEditProfile] = useState(false);

    const {
        data: session,
        isPending,
        error
    } = authClient.useSession();

    useEffect(() => {
        if (!session?.user?.email) return;
        const loadData = async () => {

            const res = await fetch(
                `http://localhost:8000/allusers/${session.user.email}`
            );

            const data = await res.json();
            setUserData(data);
        };

        loadData();
    }, [session]);

    const handleEdit = () => {
        setEditProfile(pre => { !pre })
    }
    return (
        <div className="flex-1 overflow-auto w-full max-w-5xl mx-auto p-8 font-sans bg-black min-h-screen">

            {/* Header Section */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-[2rem] font-black tracking-tight leading-tight flex items-center">
                        <span className="text-white">Profile</span>
                        <span className="text-[#ed2547]">Settings</span>
                    </h1>
                    <p className="text-slate-500 text-[0.95rem] font-medium mt-1">
                        Manage your personal information and donor credentials.
                    </p>
                </div>

                <button onClick={() => setEditProfile(pre => !pre)} className="flex items-center gap-2.5 px-6 py-2.5 bg-white border-2 border-red-50 text-[#ed2547] rounded-full font-bold text-[0.95rem] shadow-sm hover:bg-red-50 transition-colors">
                    <Pencil className="w-4 h-4" strokeWidth={2.5} />
                    {editProfile ? 'Update Profile' : 'Edit Profile'}
                </button>
            </div>

            {/* Main Profile Card */}
            <div className="bg-black rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">

                {/* Cover Photo Area with Dotted Pattern */}
                <div
                    className="h-44 w-full bg-[#3d0814]"
                    style={{
                        backgroundImage: 'radial-gradient(#5a1622 1.5px, transparent 1.5px)',
                        backgroundSize: '16px 16px'
                    }}
                ></div>

                {/* Profile Info Overlay */}
                <div className="px-10 relative flex justify-between">

                    {/* Avatar and Name */}
                    <div className="flex gap-6 -mt-16 relative z-10">
                        <div className='w-30 h-30 rounded-full overflow-hidden border-2'>
                            <Image width={0} height={0} sizes='100vw' style={{ width: '100%', height: '100%' }} src={userData?.image} alt='User Image' />

                        </div>
                        <div className="pt-20">
                            <div className="flex items-center gap-4">
                                <h2 className="text-[2rem] font-black text-white leading-none">
                                    {userData.name}
                                </h2>
                                <span className="flex items-center gap-1.5 px-3 py-1 bg-[#e8f5ed] text-[#129148] text-[0.65rem] font-extrabold uppercase tracking-wide rounded-full border border-green-100">
                                    <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={3} />
                                    Active Donor
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5 mt-2.5 text-slate-500 font-semibold text-[0.95rem]">
                                <MapPin className="w-4.5 h-4.5 text-[#ed2547]" strokeWidth={2.5} />
                                {userData.district},{userData.upazila}
                            </div>
                        </div>
                    </div>

                    {/* Blood Group Floating Badge */}
                    <div className="absolute -top-11.25 right-10 bg-[#fdf2f3] border border-red-100 rounded-3xl p-4 flex flex-col items-center justify-center w-[130px] shadow-sm z-10">
                        <span className="text-[0.6rem] font-black text-[#e85c6f] tracking-[0.15em] uppercase mb-0.5">
                            {userData.bloodGroup}
                        </span>
                        <span className="text-[2.75rem] font-black text-[#ed2547] leading-none drop-shadow-sm">
                            {userData.bloodGroup}
                        </span>
                    </div>
                </div>

                {/* Form Details Grid */}
                <div className="px-10 pt-12 pb-14 grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Left Column (Forms) */}
                    <div className="col-span-2 space-y-10">

                        {/* Personal Information Section */}
                        <section>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center justify-center w-11 h-11 bg-[#fdf2f3] text-[#ed2547] rounded-xl">
                                    <User className="w-5 h-5" strokeWidth={2.5} />
                                </div>
                                <h3 className="text-xl font-black text-white">Personal Information</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[0.65rem] font-extrabold text-slate-400 uppercase tracking-widest px-1">
                                        Full Name
                                    </label>
                                    <input defaultValue={userData.name} readOnly={!editProfile} className="bg-[#f8f9fa]/20 focus:outline-1 outline-red-600 px-4 py-3.5 rounded-xl text-[0.95rem] font-bold text-white" />


                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-[0.65rem] font-extrabold text-slate-400 uppercase tracking-widest px-1">
                                        Email (Fixed)
                                    </label>
                                    <div className="bg-[#f8f9fa]/20 px-4 py-3.5 rounded-xl text-[0.95rem] font-bold text-slate-600 flex justify-between items-center">
                                        {userData.email}
                                        <Lock className="w-4 h-4 text-slate-400" strokeWidth={2} />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Address Details Section */}
                        <section>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center justify-center w-11 h-11 bg-[#fdf2f3] text-[#ed2547] rounded-xl">
                                    <MapPin className="w-5 h-5" strokeWidth={2.5} />
                                </div>
                                <h3 className="text-xl font-black text-white">Address Details</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[0.65rem] font-extrabold text-slate-400 uppercase tracking-widest px-1">
                                        District
                                    </label>
                                    <input defaultValue={userData.district} readOnly={!editProfile} className="bg-[#f8f9fa]/20 focus:outline-1 outline-red-600  px-4 py-3.5 rounded-xl text-[0.95rem] font-bold text-white" />

                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-[0.65rem] font-extrabold text-slate-400 uppercase tracking-widest px-1">
                                        Upazila
                                    </label>
                                    <input defaultValue={userData.upazila} readOnly={!editProfile} className="bg-[#f8f9fa]/20 focus:outline-1 outline-red-600 px-4 py-3.5 rounded-xl text-[0.95rem] font-bold text-white" />
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Right Column (Medical Profile) */}
                    <div className="col-span-1">
                        <div className="bg-black rounded-[2rem] p-7 h-full flex flex-col gap-6">

                            <div className="flex items-center gap-4 mb-2">
                                <div className="flex items-center justify-center w-11 h-11 bg-white border border-red-50 text-[#ed2547] rounded-xl shadow-sm">
                                    <Droplet className="w-5 h-5" strokeWidth={2.5} />
                                </div>
                                <h3 className="text-xl font-black text-white leading-tight">
                                    Medical<br />Profile
                                </h3>
                            </div>

                            {/* Blood Group Info Box */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[0.65rem] font-extrabold text-slate-400 uppercase tracking-widest px-1">
                                    Blood Group
                                </label>
                                <input defaultValue={userData.bloodGroup} readOnly={!editProfile} className="focus:outline-1 outline-red-600 px-5 py-4 rounded-2xl bg-white/20 text-xl font-black text-[#ed2547]" />
                            </div>

                            {/* Eligibility Card */}
                            <div className="bg-black p-5 rounded-2xl shadow-sm border border-slate-100 mt-2">
                                <h4 className="font-black text-white text-[1.05rem] mb-2 leading-tight">
                                    Eligible to<br />Donate
                                </h4>
                                <p className="text-[0.85rem] font-medium text-slate-500 leading-relaxed">
                                    Your account is in good standing. You are ready to save lives.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;