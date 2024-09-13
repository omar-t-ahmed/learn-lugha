import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

// Handle the webhook POST request
export async function POST(req: Request) {
  console.log("hello")
  const sig = req.headers.get('stripe-signature');
  const body = await req.text(); // Raw body to validate the signature

  let event;

  try {
    // Verify the Stripe signature
    event = stripe.webhooks.constructEvent(body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle different Stripe webhook events
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerEmail = session.customer_email;

    if (customerEmail) {
      // Update the user's subscription status in Prisma
      try {
        await prisma.user.update({
          where: { email: customerEmail },
          data: { isSubscribed: true },
        });
        console.log(`User with email ${customerEmail} has been marked as subscribed.`);
      } catch (error) {
        console.error('Error updating user subscription status:', error);
      }
    }
  }

  return new NextResponse('Success', { status: 200 });
}