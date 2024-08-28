import { NextResponse } from 'next/server';
import Stripe from 'stripe';

interface Plan {
  name: string;
  price: number; // in cents
  interval: 'day' | 'week' | 'month' | 'year';
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // will api version here cause errors
  apiVersion: '2024-06-20',
});

export async function POST(req: Request): Promise<NextResponse> {
  const { plan } = await req.json() as { plan: Plan };

  try {
    const params: Stripe.Checkout.SessionCreateParams = {
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: plan.name,
            },
            unit_amount: plan.price, // Amount in cents
            recurring: {
              interval: plan.interval,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get('Referer')}?success=true`,
      cancel_url: `${req.headers.get('Referer')}?canceled=true`,
    };

    const checkoutSession = await stripe.checkout.sessions.create(params);
    return NextResponse.json(checkoutSession);
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: { message: error.message } }, { status: 500 });
  }
}

export async function GET(req: Request): Promise<NextResponse> {
  const session_id = new URL(req.url).searchParams.get('session_id');

  try {
    if (!session_id) {
      throw new Error('Session ID is required');
    }

    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
    return NextResponse.json(checkoutSession);
  } catch (error: any) {
    console.error('Error retrieving checkout session:', error);
    return NextResponse.json({ error: { message: error.message } }, { status: 500 });
  }
}
