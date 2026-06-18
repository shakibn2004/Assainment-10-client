import React from 'react';
import {
    LayoutGrid,
    UserCircle,
    Droplet,
    Pencil,
    LogOut
} from 'lucide-react';
import DashboardNavbar from '@/Components/Homepage/DashboardNavbar';
import Link from 'next/link';
import DashboardSidebar from '@/Components/Homepage/DashboardSidebar';

const Sidebar = ({ children }) => {
    return (
        <div className='h-screen flex flex-col overflow-hidden'>
            <DashboardNavbar />
            <div className="flex flex-1 overflow-hidden">
                <DashboardSidebar />
                <main className='flex-1 overflow-y-auto'>
                    {children}
                </main>
            </div>

        </div>
    );
};

export default Sidebar;