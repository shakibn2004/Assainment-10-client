'use client'
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Donatemodal({ donerId, donationStatus }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        data: session,
        isPending,
        error
    } = authClient.useSession();


    const handleDonate = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());

        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URI}/donationrequests/${donerId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        setIsModalOpen(false)

        redirect(`${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/dashboard/donation-request-details/${donerId}`)

    };


    return (
        <div className="min-h-screen flex justify-center font-sans">
            {/* Trigger Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                disabled={donationStatus === 'inprogress' ? true : false}
                className={`${donationStatus === 'inprogress' ? 'bg-gray-400 ' : 'bg-red-500 hover:bg-red-600'} px-6 py-3 h-fit text-white font-bold rounded-xl transition-colors shadow-md`}
            >
                Donate Now
            </button>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
                    {/* Modal Container */}
                    <div className="bg-white rounded-[2rem] w-full max-w-[400px] p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">

                        {/* Icon */}
                        <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                            <svg
                                className="w-6 h-6 text-rose-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                />
                            </svg>
                        </div>

                        {/* Header */}
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-extrabold text-gray-900 mb-2">
                                Confirm Donation
                            </h2>
                            <p className="text-xs text-gray-500 leading-relaxed px-2 font-medium">
                                Please confirm that you are available and willing to donate for this patient.
                            </p>
                        </div>

                        {/* Form Fields */}
                        <form onSubmit={handleDonate} className="space-y-5 mb-8">
                            {/* Donor Name */}
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                                    Donor Name
                                </label>
                                <input
                                    type="text"
                                    name='donorName'
                                    readOnly
                                    defaultValue={session?.user?.name}
                                    className="w-full px-4 py-3.5 rounded-xl border-2 border-blue-500 text-sm font-bold text-gray-600 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                                />
                            </div>

                            {/* Donor Email */}
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                                    Donor Email
                                </label>
                                <input
                                    type="email"
                                    name='donorEmail'
                                    defaultValue={session?.user?.email}
                                    readOnly
                                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-transparent text-sm font-bold text-gray-500 outline-none cursor-not-allowed"
                                />
                            </div>
                            {/* Donation Status */}
                            <div className='hidden'>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                                    Donor Email
                                </label>
                                <input
                                    type="email"
                                    name='donationStatus'
                                    defaultValue='inprogress'
                                    readOnly
                                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-transparent text-sm font-bold text-gray-500 outline-none cursor-not-allowed"
                                />
                            </div>
                            <button
                                type='submit'
                                className={`w-full py-4 bg-[#f02d4d] hover:bg-rose-600 text-white text-sm font-bold rounded-xl transition-all shadow-[0_4px_14px_0_rgba(240,45,77,0.39)] mb-4`}
                            >
                                Confirm & Start
                            </button>
                        </form>

                        {/* Action Buttons */}
                        <div>

                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-full text-center text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                I changed my mind
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}