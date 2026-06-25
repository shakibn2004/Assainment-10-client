import React from 'react';
import {
    ChevronRight,
    Clock,
    User,
    Building2,
    MapPin,
    Calendar,
    MessageSquare
} from 'lucide-react';
import Donatemodal from '@/Components/Homepage/DonateModal';
import Link from 'next/link';

const RequestDetails = async ({ params }) => {
    const resolvedParams = await params;
    const donerId = resolvedParams.donerId;
    const donationPromised = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URI}/donationrequests/${donerId}`);
    const donationDetails = await donationPromised.json();

    
    return (
        <div className="w-full max-w-250 mx-auto p-8 font-sans bg-black min-h-screen">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[0.7rem] font-extrabold text-slate-400 tracking-[0.15em] uppercase mb-8">
                <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
                <ChevronRight className="w-3.5 h-3.5" strokeWidth={3} />
                <span className="text-slate-900">Request ID#{donationDetails._id}</span>
            </div>

            {/* Header Section */}
            <div className="text-center relative mb-8">
                <h1 className="text-[3rem] font-black tracking-tight leading-tight mb-2">
                    <span className="text-white">Request </span>
                    <span className="text-[#ed2547]">Details</span>
                </h1>
                <p className="text-slate-500 font-semibold text-[1.05rem]">
                    View urgency, location, and requirements.
                </p>

                {/* Floating Status Badge */}
                <div className={`${donationDetails.donationStatus==='done'?'bg-green-200 text-green-600':'bg-[#fcecdb] text-[#e87a2a]'} absolute right-0 bottom-0 flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[0.8rem] font-black uppercase tracking-widest shadow-sm`}>
                    <Clock className="w-4 h-4" strokeWidth={3} />
                    {donationDetails.donationStatus}
                </div>
            </div>

            {/* Main Details Card */}
            <div className="bg-black rounded-[2.5rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">

                {/* Top Section: User & Blood Group */}
                <div className="flex justify-between items-center">

                    {/* User Info */}
                    <div className="flex items-center gap-6">
                        <div className="w-25 h-25 bg-[#fdf2f3]/30 rounded-4xl flex items-center justify-center shadow-inner">
                            <User className="w-10 h-10 text-[#ed2547]" strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="text-[2rem] font-black text-white leading-none mb-1.5">
                                {donationDetails.recipientName}
                            </h2>
                            <p className="text-[0.75rem] font-extrabold text-slate-400 tracking-[0.15em] uppercase">
                                Recipient • Patient
                            </p>
                        </div>
                    </div>

                    {/* Blood Group Badge */}
                    <div className="flex items-center gap-4 bg-white/30 p-4 pr-8 rounded-4xl">
                        <div className="w-12.5 h-12.5 bg-[#ed2547] rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-md shadow-red-200">
                            {donationDetails.bloodGroup}
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="text-[0.65rem] font-black text-[#e85c6f] tracking-[0.15em] uppercase leading-tight mb-0.5">
                                Required
                            </span>
                            <span className="text-[1.1rem] font-black text-white leading-tight">
                                Blood Group
                            </span>
                        </div>
                    </div>

                </div>

                {/* Divider */}
                <div className="w-full h-px bg-slate-100 my-10"></div>

                {/* Bottom Section: Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative">

                    {/* Vertical Divider for Desktop */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-100 ml-[-0.5px]"></div>

                    {/* Left Column: Location Details */}
                    <div className="pr-4">
                        <h3 className="text-[0.8rem] font-black text-slate-300 tracking-[0.2em] uppercase mb-8">
                            Location Details
                        </h3>

                        <div className="space-y-8">
                            {/* Hospital */}
                            <div className="flex items-start gap-5">
                                <div className="w-12 h-12 rounded-full bg-[#f0f9f4]/30 flex items-center justify-center shrink-0">
                                    <Building2 className="w-5 h-5 text-[#219653]" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <p className="text-[0.65rem] font-extrabold text-slate-400 tracking-[0.15em] uppercase mb-1">
                                        Hospital
                                    </p>
                                    <p className="text-[1.1rem] font-black text-white mb-0.5 leading-tight">
                                        {donationDetails.hospitalName}
                                    </p>
                                    <p className="text-[0.95rem] font-semibold text-slate-500">
                                        {donationDetails.fullAddress}
                                    </p>
                                </div>
                            </div>

                            {/* Full Address */}
                            <div className="flex items-start gap-5">
                                <div className="w-12 h-12 rounded-full bg-[#fdf2f3]/30 flex items-center justify-center shrink-0">
                                    <MapPin className="w-5 h-5 text-[#ed2547]" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <p className="text-[0.65rem] font-extrabold text-slate-400 tracking-[0.15em] uppercase mb-1">
                                        Full Address
                                    </p>
                                    <p className="text-[1.1rem] font-black text-white leading-tight">
                                        {donationDetails.hospitalName},<br />{donationDetails.recipientDistrict}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Timing & Urgency */}
                    <div className="md:pl-4">
                        <h3 className="text-[0.8rem] font-black text-slate-300 tracking-[0.2em] uppercase mb-8">
                            Timing & Urgency
                        </h3>

                        {/* Date & Time Row */}
                        <div className="flex gap-8 mb-8">
                            {/* Date */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#fdf2f3]/30 flex items-center justify-center shrink-0">
                                    <Calendar className="w-5 h-5 text-[#ed2547]" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <p className="text-[0.65rem] font-extrabold text-slate-400 tracking-[0.15em] uppercase mb-1">
                                        Required Date
                                    </p>
                                    <p className="text-[1.25rem] font-black text-white leading-tight">
                                        {donationDetails.donationDate}
                                    </p>
                                </div>
                            </div>

                            {/* Time */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center shrink-0">
                                    <Clock className="w-5 h-5 text-white"/>
                                </div>
                                <div>
                                    <p className="text-[0.65rem] font-extrabold text-slate-400 tracking-[0.15em] uppercase mb-1">
                                        Time
                                    </p>
                                    <p className="text-[1.25rem] font-black text-white leading-tight">
                                        {donationDetails.donationTime}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Request Message Box */}
                        <div className="bg-[#fefdf4]/30 border rounded-2xl p-6 relative">
                            <div className="flex items-center gap-2 mb-3">
                                <MessageSquare className="w-4 h-4 text-[#bd8e43]" strokeWidth={2.5} />
                                <span className="text-[0.7rem] font-black text-[#bd8e43] tracking-[0.15em] uppercase">
                                    Request Message
                                </span>
                            </div>
                            <p className="text-[1.05rem] font-bold text-white italic">
                                {donationDetails.requestMessage}
                            </p>
                        </div>

                    </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-end mt-10">
                    <Donatemodal donerId={donerId} donationStatus={donationDetails.donationStatus} />
                </div>

            </div>
        </div>
    );
};

export default RequestDetails;