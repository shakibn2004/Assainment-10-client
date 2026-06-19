'use client'
import React from 'react';
import { Syringe } from 'lucide-react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';

const DashboardWelcome = () => {
  const {
    data: session,
    isPending,
    error
  } = authClient.useSession();

  return (
    <div className="w-full max-w-5xl mx-auto p-8 font-sans bg-[#fafbfc] min-h-screen">

      {/* Header Section */}
      <div className="mb-10">
        <h1 className="text-[2.75rem] font-black tracking-tight leading-tight mb-2">
          <span className="text-slate-900">Hello, </span>
          <span className="text-[#ed2547]">{session?.user?.name}</span>
          <span className="text-slate-900">!</span>
        </h1>
        <p className="text-slate-500 font-medium text-[1.05rem]">
          Manage your activities and help save lives today.
        </p>
      </div>

      {/* Empty State Card */}
      <div className="w-full bg-white border-[1.5px] border-dashed border-gray-200 rounded-[2rem] py-24 flex flex-col items-center justify-center mb-10 shadow-[0_2px_10px_rgb(0,0,0,0.01)]">
        <Syringe
          className="w-12 h-12 text-slate-300 mb-4 stroke-[1.5]"
        />
        <h2 className="text-[1.35rem] font-extrabold text-slate-400 tracking-tight">
          No Recent Requests
        </h2>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <Link href='/donation-requests' className="bg-[#121621] text-white font-bold text-[0.85rem] tracking-[0.15em] uppercase px-8 py-4 rounded-xl shadow-[0_8px_20px_rgb(18,22,33,0.2)] hover:bg-black transition-colors hover:shadow-lg active:scale-95 transform duration-150">
          View All Requests
        </Link>
      </div>

    </div>
  );
};

export default DashboardWelcome;