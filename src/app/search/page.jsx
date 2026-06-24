'use client'
import React, { useEffect, useState } from 'react';
import { Search, Droplet, ChevronDown, ArrowRight, Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';

const FindDonor = () => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [requests, setRequests] = useState([])

  // Sample data for the dropdowns
  useEffect(() => {
    const handleFetch = async () => {
      const districtsPromised = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URI}/bddistricts`);
      const districts = await districtsPromised.json();
      setDistricts(districts);
      const districtPromised = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URI}/bddistricts/${district}`);
      const districtData = await districtPromised.json();
      const upazilasPromised = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URI}/bdupazilas/${districtData.id}`);
      const upazilas = await upazilasPromised.json();
      setUpazilas(upazilas);
    }

    handleFetch();
  }, [district])
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];


  const handleSearch = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URI}/search`, {
      headers: userData
    });
    const data = await res.json();

    setRequests(data)
  };

  return (
    <section className="py-20 bg-[#fafafa]/30 min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-4">
            Find a <span className="text-[#e11d48]">Blood Donor</span>
          </h2>
          <p className="text-slate-600 text-lg font-medium">
            Connecting heroes with those in need. Search by group and location.
          </p>
        </div>

        {/* Search Panel Container */}
        <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-12 relative z-10">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">

            {/* Blood Group Select */}
            <div className="flex flex-col">
              <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Blood Group
              </label>
              <div className="relative">
                <select
                  value={bloodGroup}
                  name='bloodGroup'
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full bg-slate-50 text-slate-700 text-sm font-bold rounded-xl px-4 py-4 appearance-none outline-none focus:ring-2 focus:ring-rose-500/20 focus:bg-white transition-all cursor-pointer"
                >
                  <option value="" disabled>Select Group</option>
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* District Select */}
            <div className="flex flex-col">
              <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                District
              </label>
              <div className="relative">
                <select
                  name='district'
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-slate-50 text-slate-700 text-sm font-bold rounded-xl px-4 py-4 appearance-none outline-none focus:ring-2 focus:ring-rose-500/20 focus:bg-white transition-all cursor-pointer"
                >
                  <option value="" disabled>Select District</option>
                  {districts.map(dist => (
                    <option key={dist.id} value={dist.name}>{dist.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Upazila Select */}
            <div className="flex flex-col">
              <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Upazila
              </label>
              <div className="relative">
                <select
                  name='upazila'
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  className="w-full bg-slate-50 text-slate-700 text-sm font-bold rounded-xl px-4 py-4 appearance-none outline-none focus:ring-2 focus:ring-rose-500/20 focus:bg-white transition-all cursor-pointer"
                >
                  <option value="" disabled>Select Upazila</option>
                  {upazilas.map(upz => (
                    <option key={upz.name} value={upz.name}>{upz.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Search Button */}
            <button type='submit' className="w-full bg-[#e11d48] hover:bg-rose-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-500/30 hover:-translate-y-0.5">
              <Search className="w-5 h-5" />
              Search Donors
            </button>

          </form>
        </div>

        {
          requests.length === 0 ? (
            // {/* Empty State / Initial Prompt Section 
            <div className="border-2 border-dashed border-slate-200 rounded-[3rem] bg-white/50 backdrop-blur-sm py-20 px-6 flex flex-col items-center text-center">

              {/* Layered Decorative Icon */}
              <div className="relative mb-8">
                {/* Outer pink circle */}
                <div className="w-32 h-32 rounded-full bg-rose-100/50 flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                {/* Middle white circle */}
                <div className="w-24 h-24 rounded-full bg-white shadow-sm flex items-center justify-center relative z-10">
                  <Droplet className="w-10 h-10 text-[#e11d48] fill-[#e11d48]" />
                </div>
                {/* Decorative dots */}
                <div className="absolute top-2 -right-1 w-3 h-3 bg-[#e11d48] rounded-full z-20"></div>
                <div className="absolute bottom-4 -left-2 w-2 h-2 bg-rose-400 rounded-full z-20"></div>
              </div>

              <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
                Ready to find a hero?
              </h3>

              <p className="text-slate-500 font-medium max-w-sm leading-relaxed">
                Select a blood group and location to see available donors.
              </p>

            </div>

          ) : (
            // {/* Card container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {requests.map((request) => (
                <div
                  key={request._id}
                  className="bg-white/10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow duration-300 relative"
                >
                  {/* Card Top Banner */}
                  <div className="bg-white/20 h-25 rounded-t-[2rem] p-6">
                    <div className={`${request.donationStatus === 'done' ? 'text-green-500' : 'text-[#ff5722]'} flex items-center gap-2 text-[10px] font-black tracking-widest uppercase`}>
                      <div className={`${request.donationStatus === 'done' ? 'bg-green-500' : 'bg-[#ff5722]'} w-2 h-2 rounded-full`}></div>
                      {request.donationStatus}
                    </div>
                  </div>

                  {/* Floating Blood Group Badge */}
                  <div className="absolute top-14 left-6 w-18 h-18 bg-white/50 rounded-2xl shadow-lg flex items-center justify-center text-[#e11d48] text-3xl font-black border border-slate-50">
                    {request.bloodGroup}
                  </div>

                  {/* Card Content */}
                  <div className="px-6 pb-6 pt-2">

                    {/* Patient Name Box (Aligned to right of badge) */}
                    <div className="flex flex-col items-center ml-14 mb-8">
                      <h3 className="text-lg font-bold text-white text-center">{request.requesterName}</h3>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Recipient</p>
                    </div>

                    {/* Details Section */}
                    <div className="space-y-5 mb-8">

                      {/* Location */}
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#fff7ed] flex items-center justify-center shrink-0">
                          <MapPin className="w-4 h-4 text-[#ff5722]" />
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Location</p>
                          <p className="text-[13px] font-bold text-slate-700">{request.fullAddress}</p>
                        </div>
                      </div>

                      {/* Date & Time */}
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#fff7ed] flex items-center justify-center shrink-0">
                          <Calendar className="w-4 h-4 text-[#ff5722]" />
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Date & Time</p>
                          <p className="text-[13px] font-bold text-slate-700">
                            {request.donationDate} <span className="text-slate-300 mx-1">|</span> {request.donationTime}
                          </p>
                        </div>
                      </div>

                    </div>

                    {/* Action Button */}
                    <Link href={`/dashboard/donation-request-details/${request._id}`} className="w-full bg-red-500/30 hover:bg-[#e64a19] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm">
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                  </div>
                </div>
              ))}
            </div>

          )
        }



      </div>
    </section>
  );
};

export default FindDonor;