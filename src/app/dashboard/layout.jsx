'use client'
import DashboardNavbar from '@/Components/Homepage/DashboardNavbar';
import Link from 'next/link';
import DashboardSidebar from '@/Components/Homepage/DashboardSidebar';
import { useState } from 'react';

const Sidebar = ({ children }) => {
    const [openSidebar, setOpenSidebar] = useState(true);

    return (
        <div className='h-screen flex flex-col overflow-hidden'>
            <DashboardNavbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
            <div className="flex flex-1 overflow-hidden">
                <DashboardSidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
                <main className='flex-1 overflow-y-auto'>
                    {children}
                </main>
            </div>

        </div>
    );
};

export default Sidebar;