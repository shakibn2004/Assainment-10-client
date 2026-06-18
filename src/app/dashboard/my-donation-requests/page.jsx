import React from 'react';
import { Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const DonationRequests = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto p-8 font-sans bg-[#fafbfc] min-h-screen">
      
      {/* Top Header Section */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-[2.5rem] font-black tracking-tight leading-tight">
            <span className="text-slate-900">My </span>
            <span className="text-[#ed2547]">Donation Requests</span>
          </h1>
          <p className="text-slate-500 font-medium text-[1.05rem] mt-1">
            Manage and track your blood donation posts.
          </p>
        </div>
        
        {/* Filter Button */}
        <button className="flex items-center gap-2.5 px-6 py-3.5 bg-white border border-gray-200 rounded-2xl font-bold text-slate-700 shadow-sm hover:bg-gray-50 transition-colors">
          <Filter className="w-5 h-5 text-slate-500" strokeWidth={2} />
          All Status
        </button>
      </div>

      {/* Table Header Bar (Pill Shape) */}
      <div className="bg-white rounded-full shadow-[0_12px_40px_rgb(0,0,0,0.06)] border border-gray-100 px-10 py-7 mb-10">
        <div className="grid grid-cols-12 gap-4 w-full text-[0.75rem] font-extrabold text-slate-400 tracking-[0.15em] uppercase items-center">
          <div className="col-span-1 pl-2 text-center md:text-left">#</div>
          <div className="col-span-3">Recipient Info</div>
          <div className="col-span-3">Location</div>
          <div className="col-span-2">Group</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1 text-right pr-2">Actions</div>
        </div>
      </div>

      {/* 
        Table Body would go here... 
        (Omitted in this snippet as it is empty in the design)
      */}

      {/* Pagination Section */}
      <div className="flex justify-between items-center px-4 mt-6">
        {/* Results Counter */}
        <div className="text-[0.95rem] font-medium text-slate-400">
          Showing <span className="font-extrabold text-slate-600">1</span> to <span className="font-extrabold text-slate-600">10</span> of <span className="font-extrabold text-slate-600">20</span> results
        </div>
        
        {/* Pagination Controls */}
        <div className="flex items-center gap-2.5">
          {/* Previous Page */}
          <button className="w-11 h-11 flex items-center justify-center bg-white border border-gray-100 rounded-xl text-slate-400 hover:bg-gray-50 hover:text-slate-600 shadow-sm transition-colors">
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
          </button>
          
          {/* Active Page Number */}
          <button className="w-11 h-11 flex items-center justify-center bg-[#ed2547] text-white rounded-xl font-black text-[1.05rem] shadow-md shadow-red-200 transition-transform active:scale-95">
            1
          </button>
          
          {/* Inactive Page Number */}
          <button className="w-11 h-11 flex items-center justify-center bg-white border border-gray-100 rounded-xl text-slate-600 font-bold text-[1.05rem] hover:bg-gray-50 shadow-sm transition-colors">
            2
          </button>
          
          {/* Next Page */}
          <button className="w-11 h-11 flex items-center justify-center bg-white border border-gray-100 rounded-xl text-slate-400 hover:bg-gray-50 hover:text-slate-600 shadow-sm transition-colors">
            <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default DonationRequests;