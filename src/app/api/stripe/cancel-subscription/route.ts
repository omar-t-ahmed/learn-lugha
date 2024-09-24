import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Find the user in your database
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.stripeSubscriptionId) {
      return NextResponse.json({ error: "User not subscribed" }, { status: 404 });
    }

    // Cancel the Stripe subscription
    await stripe.subscriptions.cancel(user.stripeSubscriptionId);

    // Update the user in your database to set isSubscribed to false and remove the subscription ID
    await prisma.user.update({
      where: { email },
      data: { isSubscribed: false, stripeSubscriptionId: null },
    });

    return NextResponse.json({ message: "Subscription canceled successfully" });
  } catch (error: any) {
    console.error("Error canceling subscription:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}