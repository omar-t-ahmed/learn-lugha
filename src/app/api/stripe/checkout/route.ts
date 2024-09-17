import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(req: Request): Promise<NextResponse> {
  
  const { plan, email } = await req.json() as {
    plan: { name: string; price: number; interval: 'day' | 'week' | 'month' | 'year' };
    email: string;
  };
  console.log(email)
  try {
    // Create a Stripe Checkout session
    const params: Stripe.Checkout.SessionCreateParams = {
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email, // Pass the email to Stripe
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
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/cancel`,
    };

    const checkoutSession = await stripe.checkout.sessions.create(params);
    return NextResponse.json(checkoutSession);
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: { message: error.message } }, { status: 500 });
  }
}