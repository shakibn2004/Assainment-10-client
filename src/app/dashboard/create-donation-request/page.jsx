import React from 'react';
import { 
  Info, 
  User, 
  Mail, 
  Droplet, 
  ChevronDown, 
  CalendarDays,
  Building2,
  MapPin,
  Calendar,
  Clock,
  MessageSquare
} from 'lucide-react';

const NewDonationRequest = () => {
  return (
    <div className="w-full max-w-[1000px] mx-auto p-8 font-sans bg-[#fafbfc] min-h-screen">
      
      {/* Header Section */}
      <div className="mb-10">
        <h1 className="text-[2.75rem] font-black tracking-tight leading-tight mb-2">
          <span className="text-slate-900">New </span>
          <span className="text-[#ed2547]">Donation Request</span>
        </h1>
        <p className="text-slate-500 font-medium text-[1.05rem]">
          Complete the form below to broadcast an urgent request to the donor community.
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Section 1: Requester Info */}
        <div className="bg-white border border-gray-200 rounded-[2rem] p-8 shadow-[0_2px_15px_rgb(0,0,0,0.02)]">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center justify-center w-10 h-10 bg-[#fdf2f3] text-[#ed2547] rounded-full">
              <Info className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <h2 className="text-[1.35rem] font-black text-slate-900">Requester Info</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Your Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[0.65rem] font-extrabold text-slate-400 uppercase tracking-widest px-1">
                Your Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-4 h-4 text-slate-400" strokeWidth={2.5} />
                </div>
                <input 
                  type="text" 
                  value="Md Nazmus Shakib" 
                  readOnly
                  className="w-full bg-[#f8f9fa] border-transparent rounded-xl py-3.5 pl-11 pr-4 text-[0.95rem] font-bold text-slate-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Your Email */}
            <div className="flex flex-col gap-2">
              <label className="text-[0.65rem] font-extrabold text-slate-400 uppercase tracking-widest px-1">
                Your Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-4 h-4 text-slate-400" strokeWidth={2.5} />
                </div>
                <input 
                  type="email" 
                  value="shakibn2004@gmail.com" 
                  readOnly
                  className="w-full bg-[#f8f9fa] border-transparent rounded-xl py-3.5 pl-11 pr-4 text-[0.95rem] font-bold text-slate-600 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Patient Details */}
        <div className="bg-white border border-gray-200 rounded-[2rem] p-8 shadow-[0_2px_15px_rgb(0,0,0,0.02)]">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center justify-center w-10 h-10 bg-[#fdf2f3] text-[#ed2547] rounded-full">
              <Droplet className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <h2 className="text-[1.35rem] font-black text-slate-900">Patient Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Recipient Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[0.65rem] font-extrabold text-slate-400 uppercase tracking-widest px-1">
                Recipient Name
              </label>
              <input 
                type="text" 
                placeholder="Enter full name" 
                className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3.5 text-[0.95rem] font-bold text-slate-800 placeholder:text-slate-400 placeholder:font-semibold focus:outline-none focus:border-red-300 focus:ring-1 focus:ring-red-300 transition-colors"
              />
            </div>

            {/* Blood Group Needed */}
            <div className="flex flex-col gap-2">
              <label className="text-[0.65rem] font-extrabold text-slate-400 uppercase tracking-widest px-1">
                Blood Group Needed
              </label>
              <div className="relative">
                <select className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3.5 text-[0.95rem] font-bold text-[#ed2547] appearance-none focus:outline-none focus:border-red-300 focus:ring-1 focus:ring-red-300 transition-colors cursor-pointer">
                  <option value="" disabled selected className="text-[#ed2547]">Select Group</option>
                  <option value="A+" className="text-slate-800">A+</option>
                  <option value="A-" className="text-slate-800">A-</option>
                  <option value="B+" className="text-slate-800">B+</option>
                  <option value="B-" className="text-slate-800">B-</option>
                  <option value="O+" className="text-slate-800">O+</option>
                  <option value="O-" className="text-slate-800">O-</option>
                  <option value="AB+" className="text-slate-800">AB+</option>
                  <option value="AB-" className="text-slate-800">AB-</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-slate-400" strokeWidth={2} />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* District */}
            <div className="flex flex-col gap-2">
              <label className="text-[0.65rem] font-extrabold text-slate-400 uppercase tracking-widest px-1">
                District
              </label>
              <div className="relative">
                <select className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3.5 text-[0.95rem] font-bold text-slate-800 appearance-none focus:outline-none focus:border-red-300 focus:ring-1 focus:ring-red-300 transition-colors cursor-pointer">
                  <option value="" disabled selected className="text-slate-800">Select District</option>
                  {/* Options would go here */}
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-slate-400" strokeWidth={2} />
                </div>
              </div>
            </div>

            {/* Upazila */}
            <div className="flex flex-col gap-2">
              <label className="text-[0.65rem] font-extrabold text-slate-400 uppercase tracking-widest px-1">
                Upazila
              </label>
              <div className="relative">
                <select className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3.5 text-[0.95rem] font-bold text-slate-800 appearance-none focus:outline-none focus:border-red-300 focus:ring-1 focus:ring-red-300 transition-colors cursor-pointer">
                  <option value="" disabled selected className="text-slate-800">Select Upazila</option>
                  {/* Options would go here */}
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-slate-400" strokeWidth={2} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Hospital & Timing */}
        <div className="bg-white border border-gray-200 rounded-[2rem] p-8 shadow-[0_2px_15px_rgb(0,0,0,0.02)]">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center justify-center w-10 h-10 bg-[#fdf2f3] text-[#ed2547] rounded-full">
              <CalendarDays className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <h2 className="text-[1.35rem] font-black text-slate-900">Hospital & Timing</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Hospital Name */}
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-1.5 text-[0.65rem] font-extrabold text-slate-400 uppercase tracking-widest px-1">
                <Building2 className="w-3.5 h-3.5" strokeWidth={2.5} />
                Hospital Name
              </label>
              <input 
                type="text" 
                placeholder="Enter hospital name" 
                className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3.5 text-[0.95rem] font-bold text-slate-800 placeholder:text-slate-400 placeholder:font-semibold focus:outline-none focus:border-red-300 focus:ring-1 focus:ring-red-300 transition-colors"
              />
            </div>

            {/* Full Address */}
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-1.5 text-[0.65rem] font-extrabold text-slate-400 uppercase tracking-widest px-1">
                <MapPin className="w-3.5 h-3.5" strokeWidth={2.5} />
                Full Address
              </label>
              <input 
                type="text" 
                placeholder="Street / Ward / Area" 
                className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3.5 text-[0.95rem] font-bold text-slate-800 placeholder:text-slate-400 placeholder:font-semibold focus:outline-none focus:border-red-300 focus:ring-1 focus:ring-red-300 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Required Date */}
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-1.5 text-[0.65rem] font-extrabold text-slate-400 uppercase tracking-widest px-1">
                <Calendar className="w-3.5 h-3.5" strokeWidth={2.5} />
                Required Date
              </label>
              <input 
                type="date" 
                className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3.5 text-[0.95rem] font-bold text-slate-800 focus:outline-none focus:border-red-300 focus:ring-1 focus:ring-red-300 transition-colors [&::-webkit-calendar-picker-indicator]:opacity-50"
              />
            </div>

            {/* Required Time */}
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-1.5 text-[0.65rem] font-extrabold text-slate-400 uppercase tracking-widest px-1">
                <Clock className="w-3.5 h-3.5" strokeWidth={2.5} />
                Required Time
              </label>
              <input 
                type="time" 
                className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3.5 text-[0.95rem] font-bold text-slate-800 focus:outline-none focus:border-red-300 focus:ring-1 focus:ring-red-300 transition-colors [&::-webkit-calendar-picker-indicator]:opacity-50"
              />
            </div>
          </div>

          {/* Request Message */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-1.5 text-[0.65rem] font-extrabold text-slate-400 uppercase tracking-widest px-1">
              <MessageSquare className="w-3.5 h-3.5" strokeWidth={2.5} />
              Request Message
            </label>
            <textarea 
              rows="4" 
              placeholder="Explain why the blood is needed..." 
              className="w-full bg-white border border-gray-100 rounded-xl px-4 py-4 text-[0.95rem] font-bold text-slate-800 placeholder:text-slate-400 placeholder:font-semibold focus:outline-none focus:border-red-300 focus:ring-1 focus:ring-red-300 transition-colors resize-y"
            ></textarea>
          </div>
        </div>

        {/* Submit Button Section */}
        <div className="flex justify-end pt-4">
          <button className="bg-[#ed2547] text-white font-bold text-[1.05rem] px-8 py-4 rounded-xl shadow-[0_8px_20px_rgb(237,37,71,0.25)] hover:bg-[#d91e3c] hover:shadow-lg transition-all active:scale-95 transform duration-150">
            Create Donation Request
          </button>
        </div>

      </div>
    </div>
  );
};

export default NewDonationRequest;