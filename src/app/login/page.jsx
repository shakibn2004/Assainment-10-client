'use client'
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4 sm:p-8">

            {/* Main Card Container */}
            <div className="w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row relative">

                {/* Decorative Top-Right Shape */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#e28e93] rounded-bl-[4rem] z-0 hidden md:block"></div>

                {/* Left Side - Illustration Panel */}
                <div className="w-full md:w-1/2 bg-[#e6e6e6] p-12 flex flex-col items-center justify-center relative">

                    {/* Custom SVG Illustration */}
                    <div className="mb-10 w-64 h-64 relative flex items-center justify-center">
                        <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            {/* Tube */}
                            <path d="M 60 70 C 60 20, 140 20, 140 70 C 140 160, 100 160, 100 110" fill="transparent" stroke="#b91c1c" strokeWidth="8" strokeLinecap="round" />

                            {/* Blood Drop */}
                            <path d="M 60 65 C 95 115, 95 155, 60 155 C 25 155, 25 115, 60 65 Z" fill="#b91c1c" />

                            {/* White Cross inside Drop */}
                            <rect x="52" y="110" width="16" height="30" fill="#e6e6e6" rx="2" />
                            <rect x="45" y="117" width="30" height="16" fill="#e6e6e6" rx="2" />

                            {/* Blood Bag Outline */}
                            <rect x="110" y="60" width="60" height="85" rx="12" stroke="#b91c1c" strokeWidth="8" fill="transparent" />

                            {/* Blood Bag Top Hook */}
                            <circle cx="140" cy="48" r="8" stroke="#b91c1c" strokeWidth="6" fill="transparent" />

                            {/* Blood inside Bag */}
                            <rect x="114" y="95" width="52" height="46" rx="6" fill="#b91c1c" />

                            {/* Bag Details (Lines) */}
                            <line x1="118" y1="75" x2="135" y2="75" stroke="#b91c1c" strokeWidth="6" strokeLinecap="round" />
                            <line x1="118" y1="85" x2="135" y2="85" stroke="#b91c1c" strokeWidth="6" strokeLinecap="round" />
                        </svg>
                    </div>

                    <h3 className="text-white text-2xl font-bold mb-2 text-center drop-shadow-md">
                        Your 15 minutes can save 3 lives.
                    </h3>
                    <p className="text-white/80 text-sm text-center font-medium drop-shadow-sm">
                        Join our community of heroes today.
                    </p>
                </div>

                {/* Right Side - Login Form Panel */}
                <div className="w-full md:w-1/2 p-10 lg:p-16 relative z-10 bg-white">

                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black text-[#111827] mb-3 tracking-tight">
                            Welcome Back
                        </h2>
                        <p className="text-slate-500 text-sm font-medium">
                            Please enter your details to access your donor dashboard.
                        </p>
                    </div>

                    <form className="space-y-6">

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-800">Email Address</label>
                            <div className="relative flex items-center">
                                <Mail className="absolute left-4 w-5 h-5 text-red-400" />
                                <input
                                    type="email"
                                    defaultValue="shakibn2004@gmail.com"
                                    className="w-full bg-[#f0f4f8] text-slate-800 text-sm font-medium rounded-xl py-3.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-red-400 transition-all"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold text-slate-800">Password</label>
                                <a href="#" className="text-xs font-bold text-[#e11d48] hover:underline">
                                    Forgot Password?
                                </a>
                            </div>
                            <div className="relative flex items-center">
                                <Lock className="absolute left-4 w-5 h-5 text-red-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    defaultValue="123456789"
                                    className="w-full bg-[#f0f4f8] text-slate-800 text-sm font-medium rounded-xl py-3.5 pl-12 pr-12 outline-none focus:ring-2 focus:ring-red-400 transition-all tracking-widest"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 text-slate-400 hover:text-slate-600 focus:outline-none"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#ef233c] hover:bg-[#d90429] text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-red-500/30 hover:-translate-y-0.5 mt-4"
                        >
                            Log In
                        </button>

                    </form>

                    {/* Registration Link */}
                    <div className="mt-8 text-center">
                        <p className="text-sm font-medium text-slate-500">
                            Don't have an account?{' '}
                            <Link className="text-[#e11d48] font-bold hover:underline" href='/register'>Register to donate</Link>
                        </p>
                    </div>

                    {/* Security Badge */}
                    <div className="mt-12 flex items-center justify-center gap-2 text-slate-400 text-xs font-medium">
                        <ShieldCheck className="w-4 h-4 text-red-300" />
                        <span>Secure 256-bit Encryption</span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;