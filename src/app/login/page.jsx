'use client'
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import NextLink from 'next/link';
import { TextField, Label, InputGroup, Button, Link } from "@heroui/react";
import { redirect, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());

        const { email, password } = userData;

        const { data, error } = await authClient.signIn.email({
            email, // required
            password, // required
            rememberMe: true,
            callbackURL: redirect || "/",
        }, {
            onSuccess: () => {
                router.push('/')
            },

            onError: (ctx) => {
                alert(ctx.error.message)
            },
        });
    };

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

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Email Field */}
                        <TextField name="email" type="email" isRequired className="w-full">
                            <Label className="text-xs font-bold text-slate-800 mb-2 block">Email Address</Label>
                            <InputGroup className="h-14 bg-[#f0f4f8] border-none rounded-xl focus-within:ring-2 focus-within:ring-red-400 transition-all">
                                <InputGroup.Prefix>
                                    <Mail className="w-5 h-5 text-red-400 mx-4 flex-shrink-0" />
                                </InputGroup.Prefix>
                                <InputGroup.Input
                                    defaultValue="shakibn2004@gmail.com"
                                    placeholder="Enter your email"
                                    className="text-sm font-medium text-slate-800 bg-transparent w-full outline-none"
                                />
                            </InputGroup>
                        </TextField>

                        {/* Password Field */}
                        <TextField name="password" isRequired className="w-full">
                            <div className="flex justify-between items-center mb-2">
                                <Label className="text-xs font-bold text-slate-800 block">Password</Label>
                                <Link
                                    as={NextLink}
                                    href="#"
                                    className="text-xs font-bold text-[#e11d48] hover:underline"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                            <InputGroup className="h-14 bg-[#f0f4f8] border-none rounded-xl focus-within:ring-2 focus-within:ring-red-400 transition-all">
                                <InputGroup.Prefix>
                                    <Lock className="w-5 h-5 text-red-400 mx-4 flex-shrink-0" />
                                </InputGroup.Prefix>
                                <InputGroup.Input
                                    type={showPassword ? "text" : "password"}
                                    defaultValue="123456789"
                                    placeholder="••••••••"
                                    className="text-sm font-medium text-slate-800 tracking-widest bg-transparent w-full outline-none"
                                />
                                <InputGroup.Suffix>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="mx-4 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </InputGroup.Suffix>
                            </InputGroup>
                        </TextField>

                        {/* Login Button */}
                        <div className="pt-2">
                            <Button
                                type="submit"
                                radius="md"
                                className="w-full bg-[#ef233c] hover:bg-[#d90429] text-white font-bold py-7 text-md transition-all duration-300 shadow-lg shadow-red-500/30 hover:-translate-y-0.5"
                            >
                                Log In
                            </Button>
                        </div>

                    </form>

                    {/* Registration Link */}
                    <div className="mt-8 text-center">
                        <p className="text-sm font-medium text-slate-500">
                            Don't have an account?{' '}
                            <Link
                                as={NextLink}
                                href='/register'
                                className="text-[#e11d48] font-bold hover:underline"
                            >
                                Register to donate
                            </Link>
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