import React from 'react';
import { Wallet, FileText, ChevronLeft, ChevronRight, Lock } from 'lucide-react';


const FundingHistory = async ({ searchParams }) => {
    const { page } = await searchParams;
    console.log(page);
    const fundingPromised = await fetch(`http://localhost:8000/funding?page=3`);
    const fundingData = await fundingPromised.json();
    return (
        <div className="min-h-screen bg-[#F8F9FA] py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-6xl mx-auto">

                {/* Header Section */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-2">
                        Funding <span className="text-[#E60023]">History</span>
                    </h1>
                    <p className="text-gray-500 text-sm sm:text-base font-medium">
                        Manage and track your contributions to the community.
                    </p>
                </div>

                {/* Action Button */}
                <div className="flex justify-end mb-4">
                    <button className="bg-[#E60023] hover:bg-red-700 transition-colors text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-sm">
                        <Wallet size={18} />
                        Give Fund
                    </button>
                </div>

                {/* Table Card */}
                <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto p-2">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Donor</th>
                                    <th className="py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Transaction ID</th>
                                    <th className="py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Date</th>
                                    <th className="py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                                    <th className="py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {fundingData.map((row) => (
                                    <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xs">
                                                    {row.initials}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 text-sm">{row.name}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">{row.role}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="bg-gray-100 text-gray-500 px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide">
                                                {row.txId}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="text-sm font-bold text-gray-700">{row.date}</p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="text-base font-black text-gray-900">{row.amount}</p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
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
                    <div className="border-t border-gray-100 px-6 py-5 flex items-center justify-between bg-white rounded-b-[2rem]">
                        <p className="text-sm font-semibold text-gray-500">
                            Showing <span className="text-gray-900">1</span> to <span className="text-gray-900">10</span> of <span className="text-gray-900">23</span> results
                        </p>
                        <div className="flex items-center gap-2">
                            <button className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors">
                                <ChevronLeft size={16} strokeWidth={3} />
                            </button>
                            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-[#E60023] text-white font-bold text-sm shadow-sm">
                                1
                            </button>
                            <button className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors">
                                2
                            </button>
                            <button className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors">
                                3
                            </button>
                            <button className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                                <ChevronRight size={16} strokeWidth={3} />
                            </button>
                        </div>
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