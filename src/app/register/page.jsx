'use client'
import React, { useState } from 'react';
import { Camera, User, Mail, Phone, MapPin, Map, Lock, RotateCcw, ChevronDown } from 'lucide-react';

const Registration = () => {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-12 px-4 sm:px-6 flex justify-center items-center">
      
      {/* Main Card */}
      <div className="w-full max-w-3xl bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        
        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-black text-[#dc2626] mb-3">
              Join the Lifesaving Community
            </h1>
            <p className="text-slate-500 font-medium text-sm md:text-base">
              Create an account to become a donor and save lives
            </p>
          </div>

          {/* Profile Photo Upload */}
          <div className="flex flex-col items-center mb-12">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-[#fff4e6] flex items-center justify-center border-4 border-white shadow-sm">
                <User className="w-12 h-12 text-[#ffb347]/60" />
              </div>
              <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md border border-slate-100 hover:bg-slate-50 transition-colors">
                <Camera className="w-4 h-4 text-slate-600" />
              </button>
            </div>
            <p className="mt-4 font-bold text-slate-800">Profile Photo</p>
          </div>

          <form className="space-y-6">
            
            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Full Name</label>
                <div className="relative flex items-center">
                  <User className="absolute left-4 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    defaultValue="Nazmus Shakib"
                    className="w-full bg-white border border-slate-200 text-slate-800 text-sm font-medium rounded-xl py-3.5 pl-11 pr-4 outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Email Address</label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 w-5 h-5 text-slate-500" />
                  <input 
                    type="email" 
                    defaultValue="shakibn2004@gmail.com"
                    className="w-full bg-[#eef2ff] border border-blue-100 text-slate-800 text-sm font-medium rounded-xl py-3.5 pl-11 pr-4 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                    placeholder="name@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Phone & Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone Number */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Phone Number</label>
                <div className="relative flex items-center">
                  <Phone className="absolute left-4 w-5 h-5 text-slate-400" />
                  <input 
                    type="tel" 
                    className="w-full bg-white border border-slate-200 text-slate-800 text-sm font-medium rounded-xl py-3.5 pl-11 pr-4 outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 transition-all"
                    placeholder="+880 1XXX XXXXXX"
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Gender</label>
                <div className="relative flex items-center">
                  <User className="absolute left-4 w-5 h-5 text-slate-400 z-10" />
                  <select className="w-full bg-white border border-slate-200 text-slate-800 text-sm font-medium rounded-xl py-3.5 pl-11 pr-10 appearance-none outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 transition-all cursor-pointer">
                    <option value="" disabled selected>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <ChevronDown className="absolute right-4 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Row 3: District & Upazila */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* District */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">District</label>
                <div className="relative flex items-center">
                  <MapPin className="absolute left-4 w-5 h-5 text-slate-400 z-10" />
                  <select className="w-full bg-white border border-slate-200 text-slate-800 text-sm font-medium rounded-xl py-3.5 pl-11 pr-10 appearance-none outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 transition-all cursor-pointer">
                    <option value="" disabled selected>Select District</option>
                    <option value="khulna">Khulna</option>
                    <option value="dhaka">Dhaka</option>
                  </select>
                  <ChevronDown className="absolute right-4 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Upazila */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Upazila</label>
                <div className="relative flex items-center">
                  <Map className="absolute left-4 w-5 h-5 text-slate-400 z-10" />
                  <select className="w-full bg-white border border-slate-200 text-slate-800 text-sm font-medium rounded-xl py-3.5 pl-11 pr-10 appearance-none outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 transition-all cursor-pointer">
                    <option value="" disabled selected>Select Upazila</option>
                    <option value="phultala">Phultala</option>
                    <option value="daulatpur">Daulatpur</option>
                  </select>
                  <ChevronDown className="absolute right-4 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Blood Group Selector */}
            <div className="space-y-3 pt-2">
              <label className="text-sm font-bold text-slate-700">Blood Group</label>
              <div className="flex flex-wrap gap-3">
                {bloodGroups.map((group) => (
                  <button
                    key={group}
                    type="button"
                    onClick={() => setSelectedBloodGroup(group)}
                    className={`flex-1 min-w-[70px] py-3 rounded-xl border text-sm font-bold transition-all ${
                      selectedBloodGroup === group 
                        ? 'bg-red-50 border-red-500 text-red-600 shadow-sm' 
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {group}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 4: Passwords */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Password</label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 w-5 h-5 text-slate-400" />
                  <input 
                    type="password" 
                    defaultValue="password123"
                    className="w-full bg-[#eef2ff] border border-blue-100 text-slate-800 text-sm font-medium rounded-xl py-3.5 pl-11 pr-4 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all tracking-widest"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Confirm Password</label>
                <div className="relative flex items-center">
                  <RotateCcw className="absolute left-4 w-5 h-5 text-slate-400" />
                  <input 
                    type="password" 
                    className="w-full bg-white border border-slate-200 text-slate-800 text-sm font-medium rounded-xl py-3.5 pl-11 pr-4 outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 transition-all tracking-widest"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button 
                type="submit" 
                className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-red-500/20 hover:-translate-y-0.5"
              >
                Complete Registration
              </button>
            </div>
            
            {/* Login Link */}
            <div className="text-center pt-2">
              <p className="text-sm font-medium text-slate-600">
                Already have an account?{' '}
                <a href="#" className="text-[#dc2626] font-bold hover:underline">
                  Login here
                </a>
              </p>
            </div>

          </form>
        </div>

        {/* Footer Text Box */}
        <div className="bg-[#f8f9fa] border-t border-slate-100 p-6 text-center">
          <p className="text-xs font-medium text-slate-500 max-w-md mx-auto leading-relaxed">
            By registering, you agree to become part of the active donor pool. Your
            information will be shared with verified recipients only.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Registration;