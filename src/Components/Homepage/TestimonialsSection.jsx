import React from 'react';
import { Quote, Heart, Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      quote: "My sister needed an O- donor after her accident. We were desperate, but through BloodBridge, we connected with a volunteer in under an hour. This service is a godsend.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "Rahim Uddin",
      role: "RECIPIENT",
      location: "DHAKA, BANGLADESH",
      rating: 5,
    },
    {
      id: 2,
      quote: "I've made blood donation a part of my life. Being able to see who my blood has helped is incredibly powerful. Every small drop counts, and this platform coordinates it all perfectly.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      name: "Sarah Islam",
      role: "DONOR",
      location: "CHITTAGONG, BANGLADESH",
      rating: 5,
    },
    {
      id: 3,
      quote: "Volunteering to verify requests has shown me the best side of humanity. The speed and safety measures here are second to none. I'm proud to be part of this chain of kindness.",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      name: "Rafiqul Hassan",
      role: "VOLUNTEER",
      location: "SYLHET, BANGLADESH",
      rating: 5,
    },
  ];

  return (
    <section className="bg-black py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-none mb-6">
              Real Stories from <br />
              <span className="text-[#e11d48]">Our Community</span>
            </h2>
            <p className="text-slate-600 text-lg font-medium max-w-xl">
              Join thousands of people who have found hope and support through our
              life-saving network.
            </p>
          </div>

          {/* Overall Rating Badge */}
          <div className="shrink-0 bg-white rounded-full py-4 px-6 flex items-center gap-3 border border-slate-100">
            <div className="flex -space-x-3">
              {[...Array(4)].map((_, i) => (
                <img key={i} src={`https://randomuser.me/api/portraits/men/${i+40}.jpg`} alt="" className="w-9 h-9 rounded-full border-2 border-white" />
              ))}
            </div>
            <div className="text-center">
              <span className="font-extrabold text-slate-950 text-base">4.9/5 RATING</span>
              <div className="flex text-amber-500 justify-center">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500" />)}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((item) => (
            <div key={item.id} className="bg-white/40 p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all flex flex-col relative">
              
              {/* Quote Icon */}
              <Quote className="absolute top-8 left-8 w-12 h-12 text-[#e11d48]/10 fill-[#e11d48]/10" />
              
              {/* Star Rating */}
              <div className="flex text-amber-500 mb-6 justify-end">
                {[...Array(item.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-500" />)}
              </div>

              {/* Quote Text */}
              <p className="text-white text-base leading-relaxed mb-12 flex-grow italic">
                “{item.quote}”
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 mt-auto">
                <img src={item.avatar} alt={item.name} className="w-16 h-16 rounded-full border-2 border-[#e11d48]/20" />
                <div>
                  <h4 className="text-lg font-bold text-slate-950">{item.name}</h4>
                  <p className="text-sm font-bold text-[#e11d48] uppercase tracking-wider">
                    {item.role}
                    <span className="text-slate-400 font-medium normal-case ml-2">, {item.location}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Button */}
        <div className="text-center">
          <button className="inline-flex items-center gap-3 bg-slate-950 hover:bg-slate-900 text-white font-semibold px-8 py-4 rounded-full text-base transition shadow-lg shadow-slate-950/20">
            <Heart className="w-5 h-5" />
            Share Your Success Story
          </button>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;