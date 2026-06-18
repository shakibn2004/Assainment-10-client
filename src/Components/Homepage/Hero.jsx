import React from 'react';
import { ShieldCheck, ArrowRight, Search, Users, DollarSign, Droplet } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative w-full bg-slate-50 min-h-screen">
      
      <div className="relative w-full h-150 rounded-b-[3rem] overflow-hidden">

        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=2000&auto=format&fit=crop')" }}
        ></div>
        
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[2px]"></div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          
          {/* Top Badge */}
          <div className="flex items-center gap-2 bg-white/10 border border-white/20 text-slate-200 text-xs md:text-sm px-4 py-1.5 rounded-full mb-8 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-rose-500" />
            <span>Trusted by 5k+ Local Heroes</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight leading-tight">
            Saving Lives, <br />
            <span className="text-rose-500">One Drop</span> at a Time
          </h1>

          {/* Subheading */}
          <p className="text-slate-300 max-w-2xl text-sm md:text-base mb-10 leading-relaxed">
            Connect directly with 20 pending requests or join our community
            of donors to help save more lives.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-500 text-white px-8 py-3.5 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-rose-600/30 hover:-translate-y-1">
              Become a Donor
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-3.5 rounded-full font-semibold transition-all duration-300 backdrop-blur-md hover:-translate-y-1">
              Search Donors
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Overlapping Stats Cards Section */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 -mt-20 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Active Donors */}
          <div className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200/50 flex flex-col items-center justify-center transform transition-transform hover:-translate-y-1">
            <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center mb-3 text-rose-500">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 mb-1">15+</h3>
            <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">Active Donors</p>
          </div>

          {/* Card 2: Total Funding (Highlighted) */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl shadow-rose-500/10 border-2 border-rose-500 flex flex-col items-center justify-center transform scale-105 z-10">
            <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center mb-3 text-white shadow-md shadow-rose-500/30">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 mb-1">$12,886</h3>
            <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">Total Funding</p>
          </div>

          {/* Card 3: Total Requests */}
          <div className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200/50 flex flex-col items-center justify-center transform transition-transform hover:-translate-y-1">
            <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center mb-3 text-rose-500">
              <Droplet className="w-5 h-5" />
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 mb-1">20</h3>
            <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">Total Requests</p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Hero;