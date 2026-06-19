import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { title } from 'framer-motion/client';
import { auth } from '@/lib/auth';


export async function POST(request) {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin');

        const userSession = await auth.api.getSession({
            headers: await headers(),
        });

        const user = userSession?.user;
        const formData = await request.formData();
        const amount = formData.get('amount');

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                    price_data: {
                        currency: 'usd',
                        unit_amount: Number(amount) * 100,
                        product_data: {
                            name: title,
                        }
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                price: Number(amount),
                userId: user.id,
                name: user.name,
                userEmail: user.email,
            },
            mode: 'payment',
            success_url: `${origin}/funding/payment_success?session_id={CHECKOUT_SESSION_ID}`,
        });
        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}