'use client'
import React, { useState } from 'react';
import { Search, Droplet, ChevronDown } from 'lucide-react';

const FindDonor = () => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');

  // Sample data for the dropdowns
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const districts = ['Khulna', 'Dhaka', 'Sylhet', 'Chittagong', 'Rajshahi'];
  const upazilas = ['Daulatpur', 'Phultala', 'Dumuria', 'Batiaghata', 'Sonadanga'];

  return (
    <section className="py-20 bg-[#fafafa] min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-4">
            Find a <span className="text-[#e11d48]">Blood Donor</span>
          </h2>
          <p className="text-slate-600 text-lg font-medium">
            Connecting heroes with those in need. Search by group and location.
          </p>
        </div>

        {/* Search Panel Container */}
        <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            
            {/* Blood Group Select */}
            <div className="flex flex-col">
              <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Blood Group
              </label>
              <div className="relative">
                <select 
                  value={bloodGroup}
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
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-slate-50 text-slate-700 text-sm font-bold rounded-xl px-4 py-4 appearance-none outline-none focus:ring-2 focus:ring-rose-500/20 focus:bg-white transition-all cursor-pointer"
                >
                  <option value="" disabled>Select District</option>
                  {districts.map(dist => (
                    <option key={dist} value={dist}>{dist}</option>
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
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  className="w-full bg-slate-50 text-slate-700 text-sm font-bold rounded-xl px-4 py-4 appearance-none outline-none focus:ring-2 focus:ring-rose-500/20 focus:bg-white transition-all cursor-pointer"
                >
                  <option value="" disabled>Select Upazila</option>
                  {upazilas.map(upz => (
                    <option key={upz} value={upz}>{upz}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Search Button */}
            <button className="w-full bg-[#e11d48] hover:bg-rose-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-500/30 hover:-translate-y-0.5">
              <Search className="w-5 h-5" />
              Search Donors
            </button>

          </div>
        </div>

        {/* Empty State / Initial Prompt Section */}
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

      </div>
    </section>
  );
};

export default FindDonor;