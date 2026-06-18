import React from 'react';
import { Droplet,  ArrowRight, Phone, Mail, MapPin, Heart } from 'lucide-react';
import { LuFacebook, LuInstagram, LuLinkedin, LuTwitter } from 'react-icons/lu';

const Footer = () => {
  return (
    <footer className="bg-[#0b0f19] text-slate-300 py-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Social Column */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-6 cursor-pointer">
              <div className="bg-[#e11d48] p-2 rounded-xl flex items-center justify-center">
                <Droplet className="w-6 h-6 text-white fill-white" />
              </div>
              <h2 className="text-2xl font-black italic tracking-tight">
                <span className="text-white">Blood</span>
                <span className="text-[#e11d48]">Bridge</span>
              </h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
              Connecting heroes with those in need. Join our community-driven platform to make blood donation accessible, fast, and safe for everyone.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[<LuFacebook />, <LuTwitter />, <LuInstagram />, <LuLinkedin />].map((Icon, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-[#151c2c] flex items-center justify-center text-slate-400 hover:bg-[#e11d48] hover:text-white transition-all duration-300"
                >
                  {Icon}
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white text-xs font-black uppercase tracking-widest mb-6">Platform</h3>
            <ul className="space-y-4">
              {['Search Donors', 'Request Blood', 'Donor List', 'Funding'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-white text-sm font-bold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white text-xs font-black uppercase tracking-widest mb-6">Support</h3>
            <ul className="space-y-4">
              {['About Us', 'Contact', 'FAQs', 'Privacy Policy'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-white text-sm font-bold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4">
            <h3 className="text-white text-xs font-black uppercase tracking-widest mb-6">Newsletter</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Get weekly updates on local blood drives and community impact stories.
            </p>
            {/* Input Field */}
            <div className="relative">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-[#151c2c] text-white placeholder-slate-500 border border-transparent rounded-xl py-4 pl-5 pr-16 focus:outline-none focus:border-[#e11d48] focus:ring-1 focus:ring-[#e11d48] transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-[#e11d48] hover:bg-rose-600 text-white rounded-lg px-4 flex items-center justify-center transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar Section */}
        <div className="border-t border-slate-800/60 pt-8 flex flex-col xl:flex-row items-center justify-between gap-6">
          
          {/* Contact Info */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 text-sm font-bold text-slate-200">
            <a href="tel:+8801891474769" className="flex items-center gap-2 hover:text-[#e11d48] transition-colors">
              <Phone className="w-4 h-4 text-[#e11d48]" />
              <span>+8801891474769</span>
            </a>
            <a href="mailto:support@bloodbridge.com" className="flex items-center gap-2 hover:text-[#e11d48] transition-colors">
              <Mail className="w-4 h-4 text-[#e11d48]" />
              <span>support@bloodbridge.com</span>
            </a>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#e11d48]" />
              <span>Khulna, Bangladesh</span>
            </div>
          </div>
          
          {/* Copyright text */}
          <div className="text-slate-500 text-xs font-black tracking-widest uppercase flex items-center gap-1.5 text-center">
            © 2026 BLOODBRIDGE APPLICATION. MADE WITH 
            <Heart className="w-3.5 h-3.5 text-[#e11d48] fill-[#e11d48] mx-0.5" /> 
            FOR HUMANITY.
          </div>
          
        </div>

      </div>
    </footer>
  );
};

export default Footer;