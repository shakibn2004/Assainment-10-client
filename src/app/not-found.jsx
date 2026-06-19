import React from 'react';
import { Droplet, AlertCircle, Home, Search, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <section className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full flex flex-col items-center text-center">
        
        {/* Animated Icon Container */}
        <div className="relative mb-8">
          {/* Main Soft Red Box */}
          <div className="w-24 h-24 bg-red-50 rounded-[2rem] flex items-center justify-center shadow-sm">
            <Droplet className="w-10 h-10 text-red-400 fill-red-400" />
          </div>
          
          {/* Overlapping Alert Badge */}
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-md border border-slate-100 flex items-center justify-center">
            <AlertCircle className="w-4 h-4 text-[#ff5722]" />
          </div>
        </div>

        {/* 404 Title */}
        <h1 className="text-8xl md:text-9xl font-black text-[#0b0f19] tracking-tighter mb-4 leading-none">
          4<span className="text-[#e11d48]">0</span>4
        </h1>

        {/* Subtitle */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0b0f19] mb-4">
          Oops! Page Not Found
        </h2>

        {/* Description Text */}
        <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed mb-10 max-w-sm mx-auto">
          The page you're looking for might have been moved, deleted, or never existed in the first place.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-full sm:w-auto justify-center">
          
          {/* Back to Home Button */}
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#e11d48] hover:bg-rose-600 text-white px-8 py-3.5 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-rose-500/20 hover:-translate-y-0.5">
            <Home className="w-4 h-4" />
            <Link href={'/'}>Back to Home</Link>
          </button>
          
          {/* Search Donors Button */}
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-8 py-3.5 rounded-xl font-bold transition-all duration-300 shadow-sm hover:-translate-y-0.5">
            <Search className="w-4 h-4" />
            <Link href={'/search'}>Search Donors</Link>
          </button>
          
        </div>

        {/* Bottom Support Link */}
        <button className="flex items-center gap-2 text-slate-400 hover:text-slate-600 text-xs font-bold uppercase tracking-wider transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Report this issue to support
        </button>

      </div>
    </section>
  );
};

export default NotFoundPage;