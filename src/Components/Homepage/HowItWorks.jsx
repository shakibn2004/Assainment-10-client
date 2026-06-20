import React from 'react';
import { UserPlus, Search, Droplet, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Register",
      description: "Create an account in minutes to join our life-saving community.",
      icon: <UserPlus className="w-8 h-8" />,
      colorTheme: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      id: 2,
      title: "Search or Request",
      description: "Find a donor near you or post a request for your specific blood group.",
      icon: <Search className="w-8 h-8" />,
      colorTheme: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      id: 3,
      title: "Connect",
      description: "Chat with available donors and coordinate the donation details.",
      icon: <Droplet className="w-8 h-8" />,
      colorTheme: "text-rose-500",
      bgColor: "bg-rose-50",
    },
    {
      id: 4,
      title: "Save a Life",
      description: "Complete the donation and make a real impact in someone's life.",
      icon: <CheckCircle2 className="w-8 h-8" />,
      colorTheme: "text-emerald-500",
      bgColor: "bg-emerald-50",
    }
  ];

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Getting Started is <span className="text-rose-600">Simple</span>
          </h2>
          <p className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed px-4">
            Follow these four easy steps to either find blood donors or start saving
            lives as a volunteer.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center text-center">
              
              {/* Icon & Number Badge Container */}
              <div className="relative mb-8">
                {/* Main Icon Background */}
                <div className={`w-24 h-24 rounded-full flex items-center justify-center ${step.bgColor} ${step.colorTheme} bg-opacity-60`}>
                  {step.icon}
                </div>
                
                {/* Small Step Number Badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white border border-slate-100 shadow-sm rounded-full flex items-center justify-center text-sm font-bold text-slate-700">
                  {step.id}
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-slate-300 leading-relaxed text-sm px-2">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA Pill */}
        <div className="mt-20 flex justify-center">
          <div className="inline-flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-full px-2 py-2 pr-6 shadow-sm">
            <span className="bg-rose-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              Ready?
            </span>
            <p className="text-sm font-medium text-slate-700">
              Join 15,000+ heroes today.{' '}
              <Link href="/register" className="text-rose-600 font-bold hover:underline ml-1">
                Create Account
              </Link>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;