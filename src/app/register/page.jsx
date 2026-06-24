'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Camera, User, Mail, Phone, MapPin, Map, Lock, RotateCcw, ImageUp, CircleUserRound } from 'lucide-react';
import {
  TextField, Label, InputGroup,
  Select, ListBox, Button, Avatar, Badge, Link, FieldError
} from "@heroui/react";
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const Registration = () => {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();
  const [district, setDistrict] = useState('');
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');


  // Sample data for the dropdowns
  useEffect(() => {
    const handleFetch = async () => {
      const districtsPromised = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URI}/bddistricts`);
      const districts = await districtsPromised.json();
      setDistricts(districts);
      const districtPromised = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URI}/bddistricts/${district}`);
      const districtData = await districtPromised.json();
      const upazilasPromised = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URI}/bdupazilas/${districtData.id}`);
      const upazilas = await upazilasPromised.json();
      setUpazilas(upazilas);
    }

    handleFetch();
  }, [district])


  // New state & ref for profile photo
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);
  const fileInputRef = useRef(null);


  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const isPasswordInvalid = confirmPassword !== '' && password !== confirmPassword;

  const { data: session, isPending, error } = authClient.useSession();

  // Handle image selection & preview
  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setProfilePhotoPreview(imageUrl);

    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await res.json();

    const url = data?.data?.url;
    setUploadedImageUrl(url);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { name, email, password, bloodGroup, district, phone, upazila, gender } = userData;

    const dbUserData = {
      name,
      email,
      bloodGroup,
      district,
      phone,
      upazila,
      gender,
      role: "doner",
      status: "active",
      image: uploadedImageUrl
    };

    await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URI}/allusers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dbUserData),
    });

    await authClient.signUp.email(
      { name, email, password, image: uploadedImageUrl },
      {
        onSuccess: () => router.push('/'),
        onError: (ctx) => alert(ctx.error.message),
      }
    );
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 flex justify-center items-center">

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

          <form onSubmit={handleSignup} className="space-y-6">

            {/* Profile Photo Upload (Now inside the form!) */}
            <div className="w-fit mx-auto relative">
              <div className='w-20 h-20 shadow-[0_0_1px] rounded-full flex items-center justify-center overflow-hidden'>
                {/* <User size={40} color='#0000008f'/> */}
                {
                  profilePhotoPreview ? (
                    <img className='w-fit h-fit' src={profilePhotoPreview} alt="" />
                  ) : (
                    <User size={40} color='#0000008f' />
                  )
                }
              </div>
              {/* Hidden file input */}
              <label className="absolute top-13 right-2">
                <ImageUp size={25} className='bg-white rounded-full p-1' />
                <input
                  type="file"
                  name="profilePhoto"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField name="name" isRequired className="w-full">
                <Label className="font-bold text-default-700 mb-1">Full Name</Label>
                <InputGroup className="h-12 border border-default-200 rounded-md">
                  <InputGroup.Prefix>
                    <User className="w-5 h-5 text-default-400 mx-3 flex-shrink-0" />
                  </InputGroup.Prefix>
                  <InputGroup.Input placeholder="Enter your full name" />
                </InputGroup>
              </TextField>

              <TextField name="email" type="email" isRequired className="w-full">
                <Label className="font-bold text-default-700 mb-1">Email Address</Label>
                <InputGroup className="h-12 bg-primary-50 hover:bg-primary-100 border-none rounded-md">
                  <InputGroup.Prefix>
                    <Mail className="w-5 h-5 text-primary-400 mx-3 flex-shrink-0" />
                  </InputGroup.Prefix>
                  <InputGroup.Input placeholder="name@example.com" />
                </InputGroup>
              </TextField>
            </div>

            {/* Row 2: Phone & Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField name="phone" type="tel" isRequired className="w-full">
                <Label className="font-bold text-default-700 mb-1">Phone Number</Label>
                <InputGroup className="h-12 border border-default-200 rounded-md">
                  <InputGroup.Prefix>
                    <Phone className="w-5 h-5 text-default-400 mx-3 flex-shrink-0" />
                  </InputGroup.Prefix>
                  <InputGroup.Input placeholder="+880 1XXX XXXXXX" />
                </InputGroup>
              </TextField>

              <Select name="gender" placeholder="Select Gender" isRequired className="w-full">
                <Label className="font-bold text-default-700 mb-1">Gender</Label>
                <Select.Trigger className="h-12 border border-default-200 rounded-md px-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-default-400 flex-shrink-0" />
                    <Select.Value />
                  </div>
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="male" textValue="Male">Male</ListBox.Item>
                    <ListBox.Item id="female" textValue="Female">Female</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Row 3: District & Upazila */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select name="district"
                onChange={(value) => {
                  setDistrict(value);
                }}
                placeholder="Select District" isRequired className="w-full">
                <Label className="font-bold text-default-700 mb-1">District</Label>
                <Select.Trigger className="h-12 border border-default-200 rounded-md px-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-default-400 shrink-0" />
                    <Select.Value />
                  </div>
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {districts.map((d) => {
                      return (
                        <ListBox.Item
                          key={d.id}
                          id={d.name}
                          textValue={d.name}
                        >
                          {d.name}
                        </ListBox.Item>
                      );
                    })}
                  </ListBox>
                </Select.Popover>
              </Select>

              <Select name="upazila" placeholder="Select Upazila" isRequired className="w-full">
                <Label className="font-bold text-default-700 mb-1">Upazila</Label>
                <Select.Trigger className="h-12 border border-default-200 rounded-md px-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Map className="w-5 h-5 text-default-400 flex-shrink-0" />
                    <Select.Value />
                  </div>
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {upazilas.map((u) => {
                      return (
                        <ListBox.Item
                          key={u.id}
                          id={u.name}
                          textValue={u.name}
                        >
                          {u.name}
                        </ListBox.Item>
                      );
                    })}
                  </ListBox>
                </Select.Popover>
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
                    className={`flex-1 min-w-[70px] py-6 font-bold transition-all ${selectedBloodGroup === group
                      ? 'bg-danger-50 border-danger-500 text-danger-600 shadow-sm border'
                      : 'bg-white text-default-700'
                      }`}
                  >
                    {group}
                  </Button>
                ))}
                <input type="hidden" name="bloodGroup" value={selectedBloodGroup} required />
              </div>
            </div>

            {/* Row 4: Passwords */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <TextField
                name="password"
                isRequired
                className="w-full"
                value={password}
                onChange={setPassword}
              >
                <Label className="font-bold text-default-700 mb-1">Password</Label>
                <InputGroup className="h-12 bg-primary-50 hover:bg-primary-100 border-none rounded-md">
                  <InputGroup.Prefix>
                    <Lock className="w-5 h-5 text-primary-400 mx-3 flex-shrink-0" />
                  </InputGroup.Prefix>
                  <InputGroup.Input type="password" placeholder="••••••••" className="tracking-widest" />
                </InputGroup>
              </TextField>

              <TextField
                name="confirmPassword"
                isRequired
                className="w-full"
                isInvalid={isPasswordInvalid}
                value={confirmPassword}
                onChange={setConfirmPassword}
              >
                <Label className="font-bold text-default-700 mb-1">Confirm Password</Label>
                <InputGroup className={`h-12 border rounded-md ${isPasswordInvalid ? 'border-danger-500' : 'border-default-200'}`}>
                  <InputGroup.Prefix>
                    <RotateCcw className={`w-5 h-5 mx-3 flex-shrink-0 ${isPasswordInvalid ? 'text-danger' : 'text-default-400'}`} />
                  </InputGroup.Prefix>
                  <InputGroup.Input type="password" placeholder="••••••••" className="tracking-widest" />
                </InputGroup>
                <FieldError>{isPasswordInvalid ? "Passwords do not match." : ""}</FieldError>
              </TextField>
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