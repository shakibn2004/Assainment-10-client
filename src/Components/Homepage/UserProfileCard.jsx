'use client'
import { authClient } from '@/lib/auth-client';
import { LayoutDashboard, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const UserProfileCard = ({ session, setUser, prCard }) => {
    const router = useRouter()
    // user signout
    const handleSingOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login"); // redirect to login page
                },
            },
        });
    }

    return (
        <div className={`${session && prCard ? "block" : "hidden"} w-72 bg-white rounded-3xl absolute top-20 right-25 shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-6 font-sans`}>
            {/* User Info Section */}
            <div className="mb-5">
                <h2 className="text-[1.15rem] font-bold text-gray-900 leading-tight">
                    {session?.user?.name}
                </h2>
                <p className="text-gray-500 text-[0.9rem] mt-0.5">
                    {session?.user?.email}
                </p>
            </div>

            {/* Divider */}
            <hr className="border-gray-100 mb-5" />

            {/* Menu Options */}
            <div className="flex flex-col gap-2">
                <button className="flex items-center gap-4 w-full p-2 hover:bg-gray-50 rounded-xl transition-colors">
                    <LayoutDashboard className="w-5 h-5 text-slate-700" strokeWidth={2} />
                    <Link href='/dashboard' className="text-slate-800 font-bold text-[0.95rem]">
                        Dashboard
                    </Link>
                </button>

                <button onClick={handleSingOut} className="flex items-center gap-4 w-full p-2 hover:bg-red-50 rounded-xl transition-colors group">
                    <LogOut className="w-5 h-5 text-red-600" strokeWidth={2} />
                    <span className="text-red-600 font-bold text-[0.95rem]">
                        Logout
                    </span>
                </button>
            </div>
        </div>
    );
};

export default UserProfileCard;