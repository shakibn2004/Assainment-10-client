import React from 'react';
import { CheckCircle2, ArrowRight, Home } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { stripe } from '@/lib/stripe';

const PaymentSuccess = async ({ searchParams }) => {
    const { session_id } = await searchParams;
    if (!session_id)
        throw new Error('Please provide a valid session_id (`cs_test_...`)')

    const {
        status,
        metadata,
        payment_intent,
        customer_details: { email: customerEmail }
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })

    const date = new Date();

    const formatted = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    if (status === 'open') {
        return redirect('/')
    }

    console.log(payment_intent);

    if (status === 'complete') {
        const paymentDetails = {
            name: metadata.name,
            amount: metadata.price,
            txId: payment_intent.id.split('_')[1],
            status: payment_intent.status,
            date: formatted,
            initials: metadata.name.split(' ')[0],
        }
        const res = await fetch(`http://localhost:8000/funding`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentDetails),
        });
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4 font-sans">
                <div className="bg-black rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] w-full max-w-[440px] p-8 sm:p-10 flex flex-col items-center">

                    {/* Success Icon */}
                    <div className="w-21 h-21 rounded-full bg-[#E8F8F0] flex items-center justify-center mb-6">
                        <CheckCircle2 className="w-9.5 h-9.5 text-[#00C177]" strokeWidth={2.5} />
                    </div>

                    {/* Heading */}
                    <div className="text-center mb-5">
                        <h1 className="text-[34px] sm:text-[38px] font-black text-white tracking-tight leading-[1.1]">
                            Payment
                        </h1>
                        <h1 className="text-[34px] sm:text-[38px] font-black text-[#FF2D46] tracking-tight leading-[1.1]">
                            Successful!
                        </h1>
                    </div>

                    {/* Description */}
                    <p className="text-[#64748B] text-center text-[15px] leading-relaxed mb-8 font-medium px-2">
                        Your donation has been securely processed. We
                        appreciate your support for <span className="font-bold italic text-white">BloodBridge</span>.
                    </p>

                    {/* Receipt Details Box */}
                    <div className="w-full bg-black border border-gray-100 rounded-3xl p-6 mb-8">
                        <div className="flex justify-between items-center border-b border-gray-200/80 pb-5 mb-5">
                            <span className="text-[11px] font-extrabold text-[#94A3B8] uppercase tracking-widest">
                                Amount Donated
                            </span>
                            <span className="text-[22px] font-black text-white">
                                {`$ ${payment_intent.amount / 100}`}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[11px] font-extrabold text-[#94A3B8] uppercase tracking-widest">
                                Transaction ID
                            </span>
                            <span className="bg-black border border-gray-200 text-white text-[11px] font-bold px-3 py-1.5 rounded-[8px] shadow-sm font-mono tracking-wide">
                                {payment_intent.id.split('_')[1]}
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="w-full flex flex-col gap-3.5">
                        <Link href={'/funding'} className="w-full bg-white/15 hover:bg-[#1C1F2D] text-green-500 h-14 rounded-xl font-bold text-[15px] flex items-center justify-center transition-all active:scale-[0.98]">
                            <span className="flex-1 text-center ml-2">View History</span>
                            <ArrowRight className="w-[18px] h-[18px] mr-4 opacity-80" strokeWidth={2.5} />
                        </Link>

                        <Link href={'/'} className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-black h-14 rounded-xl font-bold text-[15px] flex items-center justify-center gap-2.5 transition-all active:scale-[0.98]">
                            <Home className="w-5 h-5 text-black" strokeWidth={2.5} />
                            Back to Home
                        </Link>
                    </div>

                </div>
            </div>
        );
    }
}
export default PaymentSuccess;