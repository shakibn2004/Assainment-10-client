'use client'
import React, { useState } from 'react';
import { Camera, User, Mail, Phone, MapPin, Map, Lock, RotateCcw } from 'lucide-react';
import { Input, Select, SelectItem, Button, Avatar, Badge, Link } from "@heroui/react";

const Registration = () => {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-12 px-4 sm:px-6 flex justify-center items-center">
      
      {/* Main Card */}
      <div className="w-full max-w-3xl bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-default-100 overflow-hidden">
        
        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-black text-danger-600 mb-3">
              Join the Lifesaving Community
            </h1>
            <p className="text-default-500 font-medium text-sm md:text-base">
              Create an account to become a donor and save lives
            </p>
          </div>

          {/* Profile Photo Upload */}
          <div className="flex flex-col items-center mb-12">
            <Badge
              isOneChar
              content={
                <Button isIconOnly radius="full" size="sm" variant="flat" className="bg-white shadow-md border border-default-100 hover:bg-default-50">
                  <Camera className="w-4 h-4 text-default-600" />
                </Button>
              }
              placement="bottom-right"
              shape="circle"
            >
              <Avatar
                className="w-28 h-28 text-large bg-[#fff4e6] border-4 border-white shadow-sm"
                icon={<User className="w-12 h-12 text-[#ffb347]/60" />}
              />
            </Badge>
            <p className="mt-4 font-bold text-default-800">Profile Photo</p>
          </div>

          <form className="space-y-6">
            
            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                isRequired
                type="text"
                label="Full Name"
                labelPlacement="outside"
                placeholder="Enter your full name"
                size="lg"
                radius="md"
                variant="bordered"
                startContent={<User className="w-5 h-5 text-default-400 pointer-events-none flex-shrink-0" />}
                classNames={{ label: "font-bold text-default-700" }}
              />

              <Input
                isRequired
                type="email"
                label="Email Address"
                labelPlacement="outside"
                placeholder="name@example.com"
                size="lg"
                radius="md"
                variant="flat"
                color="primary"
                startContent={<Mail className="w-5 h-5 text-primary-400 pointer-events-none flex-shrink-0" />}
                classNames={{ label: "font-bold text-default-700", inputWrapper: "bg-primary-50 hover:bg-primary-100" }}
              />
            </div>

            {/* Row 2: Phone & Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                isRequired
                type="tel"
                label="Phone Number"
                labelPlacement="outside"
                placeholder="+880 1XXX XXXXXX"
                size="lg"
                radius="md"
                variant="bordered"
                startContent={<Phone className="w-5 h-5 text-default-400 pointer-events-none flex-shrink-0" />}
                classNames={{ label: "font-bold text-default-700" }}
              />

              <Select
                isRequired
                label="Gender"
                labelPlacement="outside"
                placeholder="Select Gender"
                size="lg"
                radius="md"
                variant="bordered"
                startContent={<User className="w-5 h-5 text-default-400 pointer-events-none flex-shrink-0" />}
                classNames={{ label: "font-bold text-default-700" }}
              >
                <SelectItem key="male" value="male">Male</SelectItem>
                <SelectItem key="female" value="female">Female</SelectItem>
              </Select>
            </div>

            {/* Row 3: District & Upazila */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                isRequired
                label="District"
                labelPlacement="outside"
                placeholder="Select District"
                size="lg"
                radius="md"
                variant="bordered"
                startContent={<MapPin className="w-5 h-5 text-default-400 pointer-events-none flex-shrink-0" />}
                classNames={{ label: "font-bold text-default-700" }}
              >
                <SelectItem key="khulna" value="khulna">Khulna</SelectItem>
                <SelectItem key="dhaka" value="dhaka">Dhaka</SelectItem>
              </Select>

              <Select
                isRequired
                label="Upazila"
                labelPlacement="outside"
                placeholder="Select Upazila"
                size="lg"
                radius="md"
                variant="bordered"
                startContent={<Map className="w-5 h-5 text-default-400 pointer-events-none flex-shrink-0" />}
                classNames={{ label: "font-bold text-default-700" }}
              >
                <SelectItem key="phultala" value="phultala">Phultala</SelectItem>
                <SelectItem key="daulatpur" value="daulatpur">Daulatpur</SelectItem>
              </Select>
            </div>

            {/* Blood Group Selector */}
            <div className="space-y-3 pt-2">
              <label className="text-sm font-bold text-default-700">Blood Group</label>
              <div className="flex flex-wrap gap-3">
                {bloodGroups.map((group) => (
                  <Button
                    key={group}
                    type="button"
                    onPress={() => setSelectedBloodGroup(group)}
                    radius="md"
                    variant={selectedBloodGroup === group ? "flat" : "bordered"}
                    color={selectedBloodGroup === group ? "danger" : "default"}
                    className={`flex-1 min-w-[70px] py-6 font-bold transition-all ${
                      selectedBloodGroup === group 
                        ? 'bg-danger-50 border-danger-500 text-danger-600 shadow-sm border' 
                        : 'bg-white text-default-700'
                    }`}
                  >
                    {group}
                  </Button>
                ))}
              </div>
            </div>

            {/* Row 4: Passwords */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <Input
                isRequired
                type="password"
                label="Password"
                labelPlacement="outside"
                placeholder="••••••••"
                size="lg"
                radius="md"
                variant="flat"
                color="primary"
                startContent={<Lock className="w-5 h-5 text-primary-400 pointer-events-none flex-shrink-0" />}
                classNames={{ label: "font-bold text-default-700", inputWrapper: "bg-primary-50 hover:bg-primary-100", input: "tracking-widest" }}
              />

              <Input
                isRequired
                type="password"
                label="Confirm Password"
                labelPlacement="outside"
                placeholder="••••••••"
                size="lg"
                radius="md"
                variant="bordered"
                startContent={<RotateCcw className="w-5 h-5 text-default-400 pointer-events-none flex-shrink-0" />}
                classNames={{ label: "font-bold text-default-700", input: "tracking-widest" }}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button 
                type="submit" 
                color="danger"
                size="lg"
                radius="md"
                className="w-full font-bold py-6 text-md shadow-lg shadow-danger-500/30"
              >
                Complete Registration
              </Button>
            </div>
            
            {/* Login Link */}
            <div className="text-center pt-2">
              <p className="text-sm font-medium text-default-600">
                Already have an account?{' '}
                <Link href="#" color="danger" className="font-bold text-sm">
                  Login here
                </Link>
              </p>
            </div>

          </form>
        </div>

        {/* Footer Text Box */}
        <div className="bg-default-50 border-t border-default-100 p-6 text-center">
          <p className="text-xs font-medium text-default-500 max-w-md mx-auto leading-relaxed">
            By registering, you agree to become part of the active donor pool. Your
            information will be shared with verified recipients only.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Registration;