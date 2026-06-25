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
import { useRouter } from 'next/navigation';
import { FcCancel } from 'react-icons/fc';

const DonationDashboard = () => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [data, setData] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const menuRef = useRef(null);

  const {
    data: session,
    isPending,
    error
  } = authClient.useSession();

  useEffect(() => {
    const dataFetch = async () => {
      if (session?.user?.email) {
        try {
          const rqDataPromised = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URI}/donationrequests`);
          if (rqDataPromised.ok) {
            const rqData = await rqDataPromised.json();
            setData(rqData);
          }
        } catch (err) {
          console.error("Failed to load requests:", err);
        }
      }
    }
    dataFetch();
  }, [session?.user?.email, refreshKey]);


  const handleFilter = async (e) => {
    const status = e.target.value;
    if (status === 'all') {
      setRefreshKey(prev => prev + 1);
      return
    }
    const filterPromised = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URI}/donationrequests/filter/${status}`);
    const filterData = await filterPromised.json()
    setData(filterData);
  }

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


  const handleUsers = async (id, status) => {
    const userData = {
      donationStatus: status,
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URI}/donationrequests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        setData(prev =>
          prev.map(user =>
            user._id === id
              ? { ...user, donationStatus: status }
              : user
          )
        );
      }
    } catch (error) {
      console.error("Failed to update user:", error);
      notifyErr('Update failed. Please try again.');
    }
  }

  return (
    // Adjusted outer padding for mobile vs desktop
    <div className="min-h-screen bg-black p-4 sm:p-8 md:p-10 font-sans flex justify-center">
      {/* Changed max-w-300 (not standard) to max-w-6xl for better constraint, adjust if you have a custom config */}
      <div className="w-full max-w-6xl">

        {/* Header Section */}
        {/* Stack on mobile, side-by-side on larger screens */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-5 sm:gap-0 mb-6 sm:mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-[2.5rem] font-black tracking-tight text-white leading-none">
              My <span className="text-[#f11a3b]">Donation Requests</span>
            </h1>
            <p className="text-gray-500 text-sm sm:text-lg mt-2 sm:mt-3 font-medium">
              Manage and track your blood donation posts.
            </p>
          </div>

          <button className="w-full sm:w-auto flex justify-center items-center gap-2 sm:gap-3 px-6 py-3 sm:py-3.5 bg-white/10 sm:bg-white/30 rounded-xl sm:rounded-4xl shadow-sm transition-colors group">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-white sm:group-hover:text-black stroke-[2.5] transition-colors" />
            <select onChange={handleFilter} name="status" id="" className='focus:outline-none'>
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="inprogress">Inprogress</option>
              <option value="done">Done</option>
              <option value="cancel">Canceled</option>
            </select>
          </button>
        </div>

        {/* Table Section */}
        <div className="bg-black border border-gray-900 rounded-2xl sm:rounded-[2.5rem] shadow-sm overflow-hidden mb-8">
          {/* Overflow wrapper to enable horizontal scrolling on mobile */}
          <div className="w-full overflow-x-auto pb-4 sm:pb-0">
            <table className="w-full min-w-225 text-left border-collapse">
              <thead className="bg-black border-b border-gray-900">
                <tr className="text-[10px] sm:text-xs font-bold tracking-widest text-gray-400 uppercase">
                  <th className="px-4 sm:px-6 md:px-10 py-4 sm:py-6 md:py-8 w-16 sm:w-20">#</th>
                  <th className="px-4 sm:px-6 md:px-10 py-4 sm:py-6 md:py-8">Recipient Info</th>
                  <th className="px-4 sm:px-6 md:px-10 py-4 sm:py-6 md:py-8">Location</th>
                  <th className="px-4 sm:px-6 md:px-10 py-4 sm:py-6 md:py-8">Group</th>
                  <th className="px-4 sm:px-6 md:px-10 py-4 sm:py-6 md:py-8">Status</th>
                  <th className="px-4 sm:px-6 md:px-10 py-4 sm:py-6 md:py-8 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr
                    key={row._id}
                    className="group border-b border-gray-900/50 last:border-none bg-black hover:bg-white/5 transition-colors"
                  >
                    {/* ID */}
                    <td className="px-4 sm:px-6 md:px-10 py-4 sm:py-6">
                      <span className="text-2xl sm:text-3xl font-extrabold text-gray-400 tracking-tighter">
                        {(index + 1)}
                      </span>
                    </td>

                    {/* Recipient Info */}
                    <td className="px-4 sm:px-6 md:px-10 py-4 sm:py-6">
                      <div className="flex flex-col">
                        <span className="text-base sm:text-lg font-bold text-white leading-tight">
                          {row.recipientName}
                        </span>
                        <span className="text-[10px] sm:text-xs font-bold text-gray-500 mt-1 sm:mt-1.5 uppercase tracking-wide">
                          postedBy {row.requesterName}
                        </span>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-4 sm:px-6 md:px-10 py-4 sm:py-6">
                      <div className="flex items-center gap-2 sm:gap-2.5 text-white font-bold text-sm sm:text-[17px]">
                        <MapPin className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#f11a3b] stroke-[2.5] shrink-0" />
                        <span className="truncate">{row.recipientDistrict}</span>
                      </div>
                    </td>

                    {/* Group */}
                    <td className="px-4 sm:px-6 md:px-10 py-4 sm:py-6">
                      <span className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 bg-[#fdf0f0]/10 text-[#f11a3b] font-black text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-sm min-w-[3rem] sm:min-w-[3.5rem] border border-[#f11a3b]/20">
                        {row.bloodGroup}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 sm:px-6 md:px-10 py-4 sm:py-6">
                      <span className={`
                        ${row.donationStatus === 'pending'
                          ? 'text-yellow-600'
                          : row.donationStatus === 'done'
                            ? 'text-green-500'
                            : row.donationStatus === 'inprogress'
                              ? 'text-purple-500'
                              : 'text-red-500'
                        }
                        inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#fff7ee]/10 text-[11px] sm:text-[13px] font-bold uppercase rounded-full tracking-wide`}>
                        <span className={`
                           ${row.donationStatus === 'pending'
                            ? 'bg-yellow-600'
                            : row.donationStatus === 'done'
                              ? 'bg-green-500'
                              : row.donationStatus === 'inprogress'
                                ? 'bg-purple-500'
                                : 'bg-red-500'
                          }
                          w-1.5 h-1.5 rounded-full`}></span>
                        {row.donationStatus}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 sm:px-6 md:px-10 py-4 sm:py-6 text-right relative" ref={openMenuId === row._id ? menuRef : null}>
                      <button
                        onClick={() => toggleMenu(row._id)}
                        className={`p-1.5 sm:p-2 rounded-xl transition-all focus:outline-none ${openMenuId === row._id
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-500 hover:bg-gray-800 hover:text-gray-300'
                          }`}
                      >
                        <MoreVertical className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                      </button>

                      {/* Dropdown Modal */}
                      {openMenuId === row._id && (
                        <div className="absolute right-12 sm:right-24 top-10 sm:top-1/2 sm:-translate-y-1/2 z-50 w-48 sm:w-52 bg-gray-900 rounded-xl sm:rounded-2xl shadow-xl border border-gray-700 py-2">
                          <Link href={`/dashboard/donation-request-details/${row._id}`} className="w-full px-4 sm:px-5 py-3 sm:py-3.5 text-left flex items-center gap-3 sm:gap-3.5 hover:bg-gray-800 transition-colors group/btn">
                            <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 group-hover/btn:text-blue-300 stroke-[2.5]" />
                            <span className="font-bold text-gray-200 text-sm sm:text-[15px]">View Details</span>
                          </Link>

                          <div className="h-px bg-gray-800 w-full my-0.5"></div>

                          <button onClick={() => { handleUsers(row._id, 'done'), setOpenMenuId(prev => !prev) }} className="w-full px-4 sm:px-5 py-3 sm:py-3.5 text-left flex items-center gap-3 sm:gap-3.5 hover:bg-gray-800 transition-colors group/btn">
                            <Edit2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 group-hover/btn:text-orange-300 stroke-[2.5]" />
                            <span className="font-bold text-green-500 text-sm sm:text-[15px]">Done</span>
                          </button>
                          <button onClick={() => { handleUsers(row._id, 'cancel'), setOpenMenuId(prev => !prev) }} className="w-full px-4 sm:px-5 py-3 sm:py-3.5 text-left flex items-center gap-3 sm:gap-3.5 hover:bg-gray-800 transition-colors group/btn">
                            <FcCancel className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 group-hover/btn:text-orange-300 stroke-[2.5]" />
                            <span className="font-bold text-red-500 text-sm sm:text-[15px]">Cancel</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DonationDashboard;