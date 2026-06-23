'use client'
import React, { useState, useEffect, useRef } from 'react';
import {
  Filter,
  MapPin,
  MoreVertical,
  Eye,
  Edit2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';

const DonationDashboard = () => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [data, setData] = useState([]);
  const menuRef = useRef(null); // <-- Added missing ref

  const {
    data: session,
    isPending,
    error
  } = authClient.useSession();

  useEffect(() => {
    const dataFetch = async () => {
      // Added optional chaining to prevent fetch errors if session isn't loaded yet
      if (session?.user?.email) {
        const rqDataPromised = await fetch(`http://localhost:8000/dashboard/my-donation-requests/${session.user.email}`)
        const rqData = await rqDataPromised.json();
        setData(rqData);
      }
    }
    dataFetch();
  }, [session?.user?.email]); // Added dependency

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] p-10 font-sans flex justify-center">
      <div className="w-full max-w-[1200px]">

        {/* Header Section */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-[2.5rem] font-black tracking-tight text-gray-900 leading-none">
              My <span className="text-[#f11a3b]">Donation Requests</span>
            </h1>
            <p className="text-gray-500 text-lg mt-3 font-medium">
              Manage and track your blood donation posts.
            </p>
          </div>

          <button className="flex items-center gap-3 px-6 py-3.5 bg-white border border-gray-200 rounded-4xl shadow-sm hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5 text-gray-500 stroke-[2.5]" />
            <span className="text-gray-800 font-bold text-lg">All Status</span>
          </button>
        </div>

        {/* Table Section */}
        <div className="bg-white border border-gray-200 rounded-[2.5rem] shadow-sm overflow-hidden mb-8">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#fcfcfc] border-b border-gray-100">
              <tr className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                <th className="px-10 py-8 w-20">#</th>
                <th className="px-10 py-8">Recipient Info</th>
                <th className="px-10 py-8">Location</th>
                <th className="px-10 py-8">Group</th>
                <th className="px-10 py-8">Status</th>
                <th className="px-10 py-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={row._id} // <-- Fixed to _id
                  className={`group border-b border-gray-100 last:border-none bg-white`}
                >
                  {/* ID */}
                  <td className="px-10 py-6">
                    <span className="text-3xl font-extrabold text-gray-300 tracking-tighter">
                      {(index + 1)}
                    </span>
                  </td>

                  {/* Recipient Info */}
                  <td className="px-10 py-6">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-gray-900 leading-tight">
                        {row.recipientName}
                      </span>
                      <span className="text-xs font-bold text-gray-400 mt-1.5 uppercase tracking-wide">
                        postedBy you
                      </span>
                    </div>
                  </td>

                  {/* Location */}
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-2.5 text-gray-800 font-bold text-[17px]">
                      <MapPin className="w-5.5 h-5.5 text-[#f11a3b] stroke-[2.5]" />
                      {row.recipientDistrict}
                    </div>
                  </td>

                  {/* Group */}
                  <td className="px-10 py-6">
                    <span className="inline-flex items-center justify-center px-4 py-2 bg-[#fdf0f0] text-[#f11a3b] font-black text-lg rounded-2xl shadow-sm min-w-[3.5rem]">
                      {row.bloodGroup}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-10 py-6">
                    <span className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#fff7ee] border border-orange-100 text-orange-600 text-[13px] font-bold uppercase rounded-full tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                      {row.donationStatus}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-10 py-6 text-right relative" ref={openMenuId === row._id ? menuRef : null}>
                    <button
                      onClick={() => toggleMenu(row._id)}
                      className={`p-2 rounded-xl transition-all ${openMenuId === row._id
                        ? 'bg-gray-100 text-gray-700'
                        : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
                        }`}
                    >
                      <MoreVertical className="w-6 h-6 stroke-[2.5]" />
                    </button>

                    {/* Dropdown Modal */}
                    {openMenuId === row._id && ( // <-- Fixed to _id
                      <div className="absolute right-24 top-1/2 -translate-y-1/2 z-10 w-52 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 py-2">
                        <button className="w-full px-5 py-3.5 text-left flex items-center gap-3.5 hover:bg-gray-50 transition-colors group/btn">
                          <Eye className="w-5 h-5 text-blue-600 group-hover/btn:text-blue-700 stroke-[2.5]" />
                          <Link href={`/dashboard/donation-request-details/${row._id}`} className="font-bold text-gray-800 text-[15px]">View Details</Link>
                        </button>

                        <div className="h-px bg-gray-100 w-full my-0.5"></div>

                        <button className="w-full px-5 py-3.5 text-left flex items-center gap-3.5 hover:bg-gray-50 transition-colors group/btn">
                          <Edit2 className="w-5 h-5 text-orange-500 group-hover/btn:text-orange-600 stroke-[2.5]" />
                          <Link href={`/dashboard/editrequest/${row._id}`} className="font-bold text-gray-800 text-[15px]">Edit Request</Link>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="flex justify-between items-center px-4">
          <div className="text-gray-500 font-semibold text-[15px]">
            Showing <span className="font-bold text-gray-800">1</span> to <span className="font-bold text-gray-800">10</span> of <span className="font-bold text-gray-800">23</span> results
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-400 transition-colors">
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
            <button className="w-11 h-11 flex items-center justify-center bg-[#f11a3b] text-white font-bold text-[15px] rounded-xl shadow-[0_4px_14px_rgba(241,26,59,0.35)] transition-transform hover:scale-105">
              1
            </button>
            <button className="w-11 h-11 flex items-center justify-center bg-white border border-gray-200 text-gray-700 font-bold text-[15px] rounded-xl hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="w-11 h-11 flex items-center justify-center bg-white border border-gray-200 text-gray-700 font-bold text-[15px] rounded-xl hover:bg-gray-50 transition-colors">
              3
            </button>
            <button className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors">
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DonationDashboard;