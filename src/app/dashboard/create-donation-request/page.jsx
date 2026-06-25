'use client'
import React, { useEffect, useState } from 'react';
import {
  Info,
  User,
  Mail,
  Droplet,
  ChevronDown,
  CalendarDays,
  Building2,
  MapPin,
  Calendar,
  Clock,
  MessageSquare
} from 'lucide-react';
import { Button, Card, Input, Label, ListBox, Select, TextArea } from '@heroui/react';
import { authClient } from '@/lib/auth-client';
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast.success('Request Created Successfully');

const NewDonationRequest = () => {
  const [district, setDistrict] = useState('');
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [singleUserData, setSingleUserData] = useState({});

  const {
    data: session,
    isPending,
    error
  } = authClient.useSession();

  const handleRequestCreation = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const userData = { ...data, donationStatus: "pending", donorName: null, donorEmail: null }

    await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URI}/donationrequests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    notify()
  }

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

    if (district) {
      handleFetch();
    }
  }, [district])

  useEffect(() => {
    const handleUser = async () => {
      if (!session?.user?.email) return;
      const singleUserPromised = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URI}/allusers/${session?.user?.email}`);
      const singleUser = await singleUserPromised.json();
      setSingleUserData(singleUser);
    }
    handleUser()
  }, [session])

  // Common label styling to match your design
  const labelStyles = "font-extrabold text-slate-400 uppercase tracking-widest text-[0.65rem] mb-1.5 block";

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  return (
    <div>
      {
        singleUserData.status !== 'block' ? (
          // Adjusted max-width to a standard Tailwind class (max-w-5xl) and added responsive padding
          <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 md:p-8 font-sans min-h-screen">
            <Toaster />
            {/* Header Section */}
            <div className="mb-8 sm:mb-10">
              {/* Responsive text scaling for the main header */}
              <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-black tracking-tight leading-tight mb-2">
                <span className="text-white">New </span>
                <span className="text-[#ed2547]">Donation Request</span>
              </h1>
              <p className="text-slate-500 font-medium text-sm sm:text-base md:text-[1.05rem]">
                Complete the form below to broadcast an urgent request to the donor community.
              </p>
            </div>

            <form onSubmit={handleRequestCreation} className="space-y-4 sm:space-y-6">

              {/* Section 1: Requester Info */}
              <Card className="border-none bg-black shadow-[0_2px_15px_rgb(0,0,0,0.02)] rounded-[1.5rem] sm:rounded-[2rem]">
                <Card.Content className="p-5 sm:p-6 md:p-8">
                  <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-[#ed2547] rounded-full shrink-0">
                      <Info className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                    </div>
                    <h2 className="text-lg sm:text-xl md:text-[1.35rem] font-black text-white">Requester Info</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="flex flex-col">
                      <Label className={labelStyles}>Your Name</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                          <User className="w-4 h-4 text-slate-400" strokeWidth={2.5} />
                        </div>
                        <Input
                          required
                          readOnly
                          type="text"
                          name="requesterName"
                          defaultValue={session?.user?.name || ''}
                          className="pl-11 rounded-xl bg-[#f8f9fa]/20 border-none shadow-none text-slate-400 font-bold"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <Label className={labelStyles}>Your Email</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                          <Mail className="w-4 h-4 text-slate-400" strokeWidth={2.5} />
                        </div>
                        <Input
                          required
                          readOnly
                          type="email"
                          name="requesterEmail"
                          defaultValue={session?.user?.email || ''}
                          className="pl-11 rounded-xl bg-[#f8f9fa]/20 border-none shadow-none text-slate-400 font-bold"
                        />
                      </div>
                    </div>
                  </div>
                </Card.Content>
              </Card>

              {/* Section 2: Patient Details */}
              <Card className="border-none shadow-[0_2px_15px_rgb(0,0,0,0.02)] bg-black rounded-[1.5rem] sm:rounded-[2rem]">
                <Card.Content className="p-5 sm:p-6 md:p-8">
                  <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-[#ed2547] rounded-full shrink-0">
                      <Droplet className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                    </div>
                    <h2 className="text-lg sm:text-xl md:text-[1.35rem] font-black text-white">Patient Details</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div className="flex flex-col">
                      <Label className={labelStyles}>Recipient Name</Label>
                      <Input
                        required
                        type="text"
                        name="recipientName"
                        placeholder="Enter full name"
                        className="rounded-xl border border-gray-800 bg-[#f8f9fa]/20 text-white shadow-none focus-visible:outline-none"
                      />
                    </div>

                    <div className="flex flex-col">
                      <Label className={labelStyles}>Blood Group Needed</Label>
                      <Select name="bloodGroup" required>
                        <Select.Trigger className="rounded-xl border border-gray-800 bg-[#f8f9fa]/20 h-11 px-4 shadow-none focus-visible:border-red-300">
                          <Select.Value placeholder="Select Group" className="text-[#ed2547] font-bold" />
                          <Select.Indicator>
                            <ChevronDown className="w-4 h-4 text-slate-400" strokeWidth={2} />
                          </Select.Indicator>
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            {bloodGroups.map((bg) => (
                              <ListBox.Item key={bg} id={bg} textValue={bg}>
                                {bg}
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="flex flex-col">
                      <Label className={labelStyles}>District</Label>
                      <Select 
                        onChange={(value) => { setDistrict(value) }}
                        name="recipientDistrict" 
                        required
                      >
                        <Select.Trigger className="rounded-xl border border-gray-800 text-white bg-[#f8f9fa]/20 h-11 px-4 shadow-none focus-visible:border-red-300">
                          <Select.Value placeholder="Select District" />
                          <Select.Indicator>
                            <ChevronDown className="w-4 h-4" strokeWidth={2} />
                          </Select.Indicator>
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            {districts.map((d) => (
                              <ListBox.Item key={d.id} id={d.name} textValue={d.name}>
                                {d.name}
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>

                    <div className="flex flex-col">
                      <Label className={labelStyles}>Upazila</Label>
                      <Select name="recipientUpazila" required>
                        <Select.Trigger className="rounded-xl border border-gray-800 text-white bg-[#f8f9fa]/20 h-11 px-4 shadow-none focus-visible:border-red-300">
                          <Select.Value placeholder="Select Upazila" />
                          <Select.Indicator>
                            <ChevronDown className="w-4 h-4 text-slate-400" strokeWidth={2} />
                          </Select.Indicator>
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            {upazilas.map((u) => (
                              <ListBox.Item key={u.id} id={u.name} textValue={u.name}>
                                {u.name}
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>
                  </div>
                </Card.Content>
              </Card>

              {/* Section 3: Hospital & Timing */}
              <Card className="border-none bg-black shadow-[0_2px_15px_rgb(0,0,0,0.02)] rounded-[1.5rem] sm:rounded-[2rem]">
                <Card.Content className="p-5 sm:p-6 md:p-8">
                  <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-[#ed2547] rounded-full shrink-0">
                      <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                    </div>
                    <h2 className="text-lg sm:text-xl md:text-[1.35rem] font-black text-white">Hospital & Timing</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div className="flex flex-col">
                      <Label className={labelStyles}>Hospital Name</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                          <Building2 className="w-4 h-4 text-slate-400" strokeWidth={2.5} />
                        </div>
                        <Input
                          required
                          type="text"
                          name="hospitalName"
                          placeholder="Enter hospital name"
                          className="pl-11 rounded-xl border border-gray-800 shadow-none text-white bg-[#f8f9fa]/20"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <Label className={labelStyles}>Full Address</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                          <MapPin className="w-4 h-4 text-slate-400" strokeWidth={2.5} />
                        </div>
                        <Input
                          required
                          type="text"
                          name="fullAddress"
                          placeholder="Street / Ward / Area"
                          className="pl-11 rounded-xl border border-gray-800 shadow-none text-white bg-[#f8f9fa]/20"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div className="flex flex-col">
                      <Label className={labelStyles}>Required Date</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                          <Calendar className="w-4 h-4 text-slate-400" strokeWidth={2.5} />
                        </div>
                        <Input
                          required
                          type="date"
                          name="donationDate"
                          className="pl-11 rounded-xl border border-gray-800 shadow-none text-white bg-[#f8f9fa]/20 min-h-[44px]"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <Label className={labelStyles}>Required Time</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                          <Clock className="w-4 h-4 text-slate-400" strokeWidth={2.5} />
                        </div>
                        <Input
                          required
                          type="time"
                          name="donationTime"
                          className="pl-11 rounded-xl border border-gray-800 shadow-none text-white bg-[#f8f9fa]/20 min-h-[44px]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <Label className={labelStyles}>Request Message</Label>
                    <div className="relative">
                      <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none z-10">
                        <MessageSquare className="w-4 h-4 text-slate-400" strokeWidth={2.5} />
                      </div>
                      <TextArea
                        required
                        name="requestMessage"
                        placeholder="Explain why the blood is needed..."
                        className="pl-11 min-h-[120px] w-full rounded-xl border border-gray-800 shadow-none py-3 text-white bg-[#f8f9fa]/20 resize-y"
                      />
                    </div>
                  </div>
                </Card.Content>
              </Card>

              {/* Submit Button Section */}
              <div className="flex justify-end pt-2 sm:pt-4">
                {/* w-full on mobile, auto width on larger screens */}
                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-[#ed2547] text-white font-bold text-base sm:text-[1.05rem] px-6 sm:px-8 py-5 sm:py-6 rounded-xl shadow-[0_8px_20px_rgb(237,37,71,0.25)] hover:scale-[0.98] transition-transform"
                >
                  Create Donation Request
                </Button>
              </div>

            </form>
          </div>
        ) : (
          <div className='flex h-[80vh] text-center flex-col gap-3 justify-center items-center px-4'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-black text-red-500'>
              You are not allowed to create a request!
            </h1>
            <p className='text-green-500 text-lg sm:text-xl md:text-2xl'>
              Please contact an admin.
            </p>
          </div>
        )
      }
    </div>
  );
};

export default NewDonationRequest;