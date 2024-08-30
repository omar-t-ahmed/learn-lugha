import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, name, username }: { email: string; name?: string; username: string } = await req.json();

    // Create the user using prisma.user.create
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        username,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Failed to create user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // Properly close the Prisma Client connection
  }
}