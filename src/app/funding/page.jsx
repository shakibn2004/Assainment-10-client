import React from 'react';
import { Wallet, FileText, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { PaginationBasic } from '@/Components/Homepage/Pagination';
import FundModal from '@/Components/Homepage/FundModal';
import { stripe } from '@/lib/stripe';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';


const FundingHistory = async ({ searchParams }) => {
    const { page } = await searchParams;
    const fundingPromised = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URI}/funding?page=${page}`);
    const data = await fundingPromised.json();
    const fundingData = data.data;

    return (
        <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-6xl mx-auto">

                {/* Header Section */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-2">
                        Funding <span className="text-[#E60023]">History</span>
                    </h1>
                    <p className="text-gray-500 text-sm sm:text-base font-medium">
                        Manage and track your contributions to the community.
                    </p>
                </div>

                {/* Action Button */}
                <div className="flex justify-end mb-4">
                    <FundModal />
                </div>

                {/* Table Card */}
                <div className="bg-black rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto p-2">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Donor</th>
                                    <th className="py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Transaction ID</th>
                                    <th className="py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Date</th>
                                    <th className="py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                                    <th className="py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fundingData.map((row) => (
                                    <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-100/20 overflow-hidden flex items-center justify-center text-gray-600 font-bold text-xs">
                                                    {row.initials}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white text-sm">{row.name}</p>
                                                    <p className="text-[10px] font-bold text-white/40 uppercase mt-0.5">{row.role}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="bg-gray-100/30 text-gray-500 px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide">
                                                {row.txId}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="text-sm font-bold text-gray-700">{row.date}</p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="text-base font-black text-white">${row.amount}</p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="inline-flex items-center gap-1.5 text-green-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <button className="text-gray-300 hover:text-gray-500 transition-colors inline-flex justify-center w-full">
                                                <FileText size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="border-t border-gray-100/20 px-6 py-5 flex items-center justify-between bg-white/20 rounded-b-[2rem]">
                        <p className="text-sm flex gap-1 font-semibold text-gray-500">
                            Showing <span className="text-gray-900">{data.page ? ((data.page - 1) * data.limit + 1) : 1}</span> to <span className="text-gray-900">{(data.page ? data.page - 1 : 0) * data.limit + fundingData.length}</span> of <span className="text-gray-900">{data.totalData}</span> results
                        </p>
                        <PaginationBasic totalPages={data.totalPage} page={page} />
                    </div>
                </div>

                {/* Security Note */}
                <div className="mt-8 flex items-center justify-center gap-2 text-gray-400">
                    <Lock size={14} />
                    <span className="text-xs font-bold uppercase tracking-wider">Payments secured by Stripe</span>
                </div>

            </div>
        </div>
    );
}
export default FundingHistory;