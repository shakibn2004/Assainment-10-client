'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Edit2, Eye, Map, MapPin, MoreVertical, Syringe, Timer } from 'lucide-react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import AdminDashboard from '@/Components/Homepage/AdminDashboard';


const DashboardWelcome = () => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  const menuRef = useRef(null);

  const {
    data: session,
    isPending,
    error
  } = authClient.useSession();

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  useEffect(() => {
    const dataLoad = async () => {
      const dataPromised = await fetch('http://localhost:8000/donationrequests');
      const allData = await dataPromised.json();
      setData(allData);

      const currentUserPromised = await fetch(`http://localhost:8000/allusers/${session?.user?.email}`);
      const currentUser = await currentUserPromised.json();
      setUserData(currentUser);

    }
    dataLoad();
  }, [session])

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
          Manage your activities and help save lives today. dear {userData.role}
        </p>
      </div>
      {
        userData?.role === "admin"
          ? (
            <AdminDashboard session={session} />
          )
          : userData?.role === "volunteer"
            ? (
              <AdminDashboard session={session} />
            )
            : (
              !data ? (
                <div>
                  {/* Empty State Card  */}
                  < div className="w-full bg-white border-[1.5px] border-dashed border-gray-200 rounded-[2rem] py-24 flex flex-col items-center justify-center mb-10 shadow-[0_2px_10px_rgb(0,0,0,0.01)]">
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

              ) : (
                <div>
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
                        {data.slice(0, 3).map((row, index) => (
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

                  {/* Action Button */}
                  <div className="flex justify-center">
                    <Link href='/donation-requests' className="bg-[#121621] text-white font-bold text-[0.85rem] tracking-[0.15em] uppercase px-8 py-4 rounded-xl shadow-[0_8px_20px_rgb(18,22,33,0.2)] hover:bg-black transition-colors hover:shadow-lg active:scale-95 transform duration-150">
                      View All Requests
                    </Link>
                  </div>
                </div>
              )
            )
      }
    </div >
  );
};

export default DashboardWelcome;