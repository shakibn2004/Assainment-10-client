'use client'
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { redirect, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast.success('Details Upadated');

const EditRequest = ({ params }) => {
    const [data, setData] = useState([])
    const id = useParams().editId;

    const {
        data: session,
        isPending,
        error
    } = authClient.useSession();

    if (!session && !isPending) {
        redirect('/login')
    }


    useEffect(() => {
        if (!session?.user?.email) return;
        const dataLoad = async () => {
            const singleDataPromised = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URI}/donationrequests/${id}`)
            const singleData = await singleDataPromised.json();
            setData(singleData);

        }
        dataLoad();
    }, [])

    const handleEdit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());

        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URI}/donationrequests/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });
        notify()
    }
    return (
        <div className="bg-black p-8 md:p-12 font-sans flex flex-col items-center">
            <div className="max-w-250 w-full">

                <Toaster />

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
                    <div className="flex items-start gap-5">
                        {/* Back Button */}
                        <Link href={'/dashboard/my-donation-requests'} className="w-14 h-14 bg-black rounded-full flex items-center justify-center shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-50 text-gray-400 hover:text-gray-600 transition-colors shrink-0 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5" />
                                <path d="M12 19l-7-7 7-7" />
                            </svg>
                        </Link>

                        {/* Title & Subtitle */}
                        <div>
                            <h1 className="text-[44px] font-black tracking-tight leading-none mb-2">
                                <span className="text-white">Edit</span> <span className="text-[#EB454E]">Request</span>
                            </h1>
                            <p className="text-gray-500 text-lg font-medium">
                                Update the details for this blood requirement.
                            </p>
                        </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex-shrink-0 mt-2 md:mt-0">
                        <span className="inline-flex items-center bg-white/20 text-[#F97316] px-5 py-2.5 rounded-full text-[12px] font-black tracking-[0.15em] uppercase">
                            CURRENT STATUS: {data.donationStatus}
                        </span>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-black rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-10 md:p-12">
                    <form onSubmit={handleEdit}>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 mb-8">

                            {/* Recipient Name Input */}
                            <div>
                                <label className="flex items-center gap-2 mb-3 text-[11px] font-bold text-gray-400 tracking-[0.15em] uppercase">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#EB454E]">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                    Recipient Name
                                </label>
                                <input
                                    type="text"
                                    name='recipientName'
                                    defaultValue={data.recipientName}
                                    className="w-full capitalize bg-[#F8F9FA]/30 rounded-xl px-6 py-5 text-white font-bold text-[17px] focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all border border-transparent"
                                />
                            </div>

                            {/* District Input */}
                            <div>
                                <label className="flex items-center gap-2 mb-3 text-[11px] font-bold text-gray-400 tracking-[0.15em] uppercase">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#EB454E]">
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    District
                                </label>
                                <input
                                    type="text"
                                    name='recipientDistrict'
                                    defaultValue={data.recipientDistrict}
                                    className="w-full capitalize bg-[#F8F9FA]/30 rounded-[16px] px-6 py-5 text-white font-bold text-[17px] focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all border border-transparent"
                                />
                            </div>

                            {/* Upazila Input */}
                            <div>
                                <label className="flex items-center gap-2 mb-3 text-[11px] font-bold text-gray-400 tracking-[0.15em] uppercase">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#EB454E]">
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    Upazila
                                </label>
                                <input
                                    type="text"
                                    name='recipientUpazila'
                                    defaultValue={data.recipientUpazila}
                                    className="w-full capitalize bg-[#F8F9FA]/30 rounded-[16px] px-6 py-5 text-white font-bold text-[17px] focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all border border-transparent"
                                />
                            </div>

                            {/* Hospital Name Input */}
                            <div>
                                <label className="flex items-center gap-2 mb-3 text-[11px] font-bold text-gray-400 tracking-[0.15em] uppercase">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#EB454E]">
                                        <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
                                        <path d="M9 22v-4h6v4" />
                                        <path d="M12 6v4" />
                                        <path d="M10 8h4" />
                                    </svg>
                                    Hospital Name
                                </label>
                                <input
                                    type="text"
                                    name='hospitalName'
                                    defaultValue={data.hospitalName}
                                    className="w-full capitalize bg-[#F8F9FA]/30 rounded-[16px] px-6 py-5 text-white font-bold text-[17px] focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all border border-transparent"
                                />
                            </div>
                        </div>

                        {/* Full Detailed Address Input (Full Width) */}
                        <div className="mb-12">
                            <label className="flex items-center gap-2 mb-3 text-[11px] font-bold text-gray-400 tracking-[0.15em] uppercase">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#EB454E]">
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                Full Detailed Address
                            </label>
                            <textarea
                                defaultValue={data.fullAddress}
                                name='fullAddress'
                                className="w-full bg-[#F8F9FA]/30 rounded-[16px] px-6 py-5 text-white/80 font-bold text-[17px] focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all border border-transparent resize-none h-[140px]"
                            ></textarea>
                        </div>

                        {/* Form Actions */}
                        <div className="flex flex-col-reverse sm:flex-row justify-end items-center gap-4">
                            <Link href={'/dashboard/my-donation-requests'}>
                                <button
                                    className="w-full sm:w-auto bg-[#F4F5F7] hover:bg-[#E5E7EB] text-gray-500 px-10 py-4 rounded-[14px] font-bold text-[16px] transition-colors"
                                >
                                    Cancel
                                </button>
                            </Link>

                            <button
                                type="submit"
                                className="w-full sm:w-auto bg-red-500 hover:bg-[#d43d45] text-white px-8 py-4 rounded-[14px] font-bold text-[16px] transition-all flex items-center justify-center gap-2.5 shadow-[0_8px_20px_rgba(235,69,78,0.25)] hover:shadow-[0_8px_25px_rgba(235,69,78,0.35)]"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                                    <polyline points="17 21 17 13 7 13 7 21" />
                                    <polyline points="7 3 7 8 15 8" />
                                </svg>
                                Update Request
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );
};

export default EditRequest;