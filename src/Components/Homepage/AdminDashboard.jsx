'use client'

import { useEffect, useState } from "react";

const AdminDashboard = ({ session }) => {
    
    const [allUsers, setAllUsers] = useState([]);
    const [funding, setFunding] = useState([]);
    const [bloodRequest, setBloodRequest] = useState([]);
    
    useEffect(() => {
        const dataFetch = async () => {
            const allUserPromised = await fetch('http://localhost:8000/allusers');
            const allUserSet = await allUserPromised.json();
            setAllUsers(allUserSet);

            const fundingPromised = await fetch('http://localhost:8000/funding');
            const fundingSet = await fundingPromised.json();
            setFunding(fundingSet);

            const bloodPromised = await fetch('http://localhost:8000/donationrequests');
            const bloodSet = await bloodPromised.json();
            setBloodRequest(bloodSet);
        }
        dataFetch();
    }, [])
    
    const stats = [
        {
            title: "Total Donors",
            value: `${allUsers?.length}`,
            trend: "+12%",
            iconBg: "bg-[#F3F6FF]",
            iconColor: "text-[#4F65F6]",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            )
        },
        {
            title: "Total Funding",
            value: `${funding?.data?.length}`,
            trend: "+5%",
            iconBg: "bg-[#F0FDF4]",
            iconColor: "text-[#22C55E]",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                    <path d="M12 18V6" />
                </svg>
            )
        },
        {
            title: "Blood Requests",
            value: `${bloodRequest?.length}`,
            trend: "+8%",
            iconBg: "bg-[#FEF2F2]",
            iconColor: "text-[#E11D48]",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
                </svg>
            )
        }
    ];

    return (
        <div className="bg-[#fafbfc] min-h-screen p-8 md:p-12 font-sans w-full flex justify-center">
            <div className="max-w-6xl w-full">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 flex flex-col justify-between h-[200px]"
                        >
                            {/* Top Row: Icon & Trend */}
                            <div className="flex justify-between items-start mb-6">
                                <div className={`w-14 h-14 rounded-[1rem] flex items-center justify-center ${stat.iconBg} ${stat.iconColor}`}>
                                    {stat.icon}
                                </div>

                                <div className="flex items-center gap-1 bg-[#F0FDF4] text-[#15803D] px-3 py-1.5 rounded-full font-bold text-[13px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                        <polyline points="17 6 23 6 23 12" />
                                    </svg>
                                    {stat.trend}
                                </div>
                            </div>

                            {/* Bottom Row: Title & Value */}
                            <div>
                                <h3 className="text-gray-500 font-bold text-[14px] mb-1">
                                    {stat.title}
                                </h3>
                                <p className="text-[#111625] font-black text-[38px] leading-none tracking-tight">
                                    {stat.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;