import React from 'react';
import { MapPin, Calendar, ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';

const DonationRequests = async () => {
  const requestsPromised = await fetch('http://localhost:8000/donationrequests')
  const requests = await requestsPromised.json();

  return (
    <section className="py-20 bg-[#fafafa]">
      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
            Donation <span className="text-[#e11d48]">Requests</span>
          </h2>
          <p className="text-slate-600 font-medium">
            Your donation can save a life. Browse pending requests below and find urgent
            needs matching your blood group.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {requests.map((request) => (
            <div
              key={request._id}
              className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow duration-300 relative"
            >
              {/* Card Top Banner */}
              <div className="bg-[#fff7ed] h-[100px] rounded-t-[2rem] p-6">
                <div className={`${request.donationStatus === 'done' ? 'text-green-500' : 'text-[#ff5722]'} flex items-center gap-2 text-[10px] font-black tracking-widest uppercase`}>
                  <div className={`${request.donationStatus === 'done' ? 'bg-green-500' : 'bg-[#ff5722]'} w-2 h-2 rounded-full`}></div>
                  {request.donationStatus}
                </div>
              </div>

              {/* Floating Blood Group Badge */}
              <div className="absolute top-[3.5rem] left-6 w-[72px] h-[72px] bg-white rounded-2xl shadow-lg flex items-center justify-center text-[#e11d48] text-3xl font-black border border-slate-50">
                {request.bloodGroup}
              </div>

              {/* Card Content */}
              <div className="px-6 pb-6 pt-2">

                {/* Patient Name Box (Aligned to right of badge) */}
                <div className="flex flex-col items-center ml-14 mb-8">
                  <h3 className="text-lg font-bold text-slate-900 text-center">{request.requesterName}</h3>
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
                <Link href={`/dashboard/donation-request-details/${request._id}`} className="w-full bg-[#ff5722] hover:bg-[#e64a19] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm">
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </Link>

              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center">
          <button className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 font-bold px-8 py-3.5 rounded-full hover:bg-slate-50 transition-colors shadow-sm text-sm">
            Load More Requests
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default DonationRequests;