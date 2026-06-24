import React from 'react';
import { AlertCircle, ArrowRight, MapPin, Calendar, Clock, Droplet } from 'lucide-react';

const UrgentNeeds = () => {
  const requests = [
    {
      id: 1,
      bloodGroup: 'A+',
      patientName: 'Mahbub Vai',
      location: 'Osmaninagar, Sylhet',
      date: '2025-12-21',
      time: '22:30',
    },
    {
      id: 2,
      bloodGroup: 'B-',
      patientName: 'Sojib',
      location: 'Islampur, Jamalpur',
      date: '2025-12-29',
      time: '16:42',
    },
    {
      id: 3,
      bloodGroup: 'A-',
      patientName: 'Babul Mia',
      location: 'Bishwambarpur, Sunamganj',
      date: '2025-12-22',
      time: '23:00',
    },
  ];

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide mb-6">
              <AlertCircle className="w-4 h-4" />
              <span>Urgent Needs</span>
            </div>
            
            {/* Main Title */}
            <h2 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-none mb-4">
              Heroes Needed <br />
              <span className="text-[#e11d48]">Immediately</span>
            </h2>
            
            {/* Subtitle */}
            <p className="text-slate-600 text-lg font-medium leading-relaxed max-w-xl">
              Real-time blood requests from people in your community. Your quick response 
              could be the miracle they are waiting for.
            </p>
          </div>

          {/* View All Link */}
          <div className="shrink-0">
            <a 
              href="#" 
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white border-b-2 border-slate-900 pb-1 hover:text-[#e11d48] hover:border-[#e11d48] transition-colors"
            >
              View All Requests
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {requests.map((request) => (
            <div 
              key={request.id} 
              className="bg-white/40 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300"
            >
              {/* Card Header: Blood Group & Urgent Badge */}
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl font-black text-[#e11d48]">
                  {request.bloodGroup}
                </div>
                <div className="bg-white/20 text-orange-600 text-[10px] font-bold uppercase px-3 py-1.5 rounded-full tracking-wider">
                  Urgent
                </div>
              </div>

              {/* Patient Name */}
              <h3 className="text-2xl font-bold text-whi mb-6">
                For {request.patientName}
              </h3>

              {/* Request Details */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-white font-medium">
                  <MapPin className="w-5 h-5 text-red-500 shrink-0" />
                  <span className="text-sm">{request.location}</span>
                </div>
                <div className="flex items-center gap-3 text-white font-medium">
                  <Calendar className="w-5 h-5 text-red-500 shrink-0" />
                  <span className="text-sm">{request.date}</span>
                </div>
                <div className="flex items-center gap-3 text-white font-medium">
                  <Clock className="w-5 h-5 text-red-500 shrink-0" />
                  <span className="text-sm">{request.time}</span>
                </div>
              </div>

              {/* Donate Button */}
              <button className="w-full bg-white/20 hover:bg-slate-100 text-slate-900 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                Donate Now
                <Droplet className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default UrgentNeeds;