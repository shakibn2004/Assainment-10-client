'use client'
import React, { useState } from 'react';
import { Droplets, User, Menu, X } from 'lucide-react';
import Link from 'next/link';
import UserProfileCard from './UserProfileCard';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prCard, setPrCard] = useState(false);
  const pathName = usePathname()
  const {
    data: session,
    isPending,
    error
  } = authClient.useSession();

  const allNavLinks = [
    { name: 'Home', url: '/', active: true },
    { name: 'Donation Requests', url: '/donation-requests', active: false },
    { name: 'Search Donor', url: '/search', active: false },
    { name: 'Funding', url: '/funding', active: false },
  ];

  const navLinks = session
    ? allNavLinks.filter(link => link.name !== "Search Donor")
    : allNavLinks.filter(link => link.name !== "Funding");

  return (
    <nav className="bg-black/90 sticky w-full top-0 z-50 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo Section */}
          <Link href='/' className="flex items-center gap-2 cursor-pointer">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-50 border border-red-100 text-red-600">
              <Droplets className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="text-red-600">Blood</span>
              <span className="text-white">Bridge</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                className={`font-medium text-base transition-colors duration-200 ${link.url === pathName
                  ? 'text-red-600'
                  : 'text-white hover:text-red-600'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Login Button (Desktop) */}
          <div className="hidden md:flex items-center">
            <Link className={`${session ? "hidden" : "flex"} items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg`} href={'/login'}>
              <User className="w-5 h-5" />
              Login
            </Link>
            <div onClick={() => setPrCard(p => !p)} className={`${session ? "flex" : "hidden"} overflow-hidden px-1 pt-0.5 w-12 h-12 text-3xl cursor-pointer flex items-center justify-center rounded-full shadow-[0_0_2px]  hover:border-2 hover:border-red-500`}>
              <Image width={0} height={0} sizes='100vw' style={{width: '100%', height: '100%'}} src={session?.user?.image} alt='User Image'/>
            </div>
          </div>

          {/* User Profile Card */}
          <UserProfileCard session={session} prCard={prCard} />

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-red-600 focus:outline-none p-2"
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-lg absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`block px-3 py-3 rounded-md text-base font-medium ${link.active
                  ? 'bg-red-50 text-red-600'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-red-600'
                  }`}
              >
                {link.name}
              </a>
            ))}
            <button className="w-full mt-4 flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-3 rounded-full font-medium shadow-md">
              <User className="w-5 h-5" />
              <span>Login</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;