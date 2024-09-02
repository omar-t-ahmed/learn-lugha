import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/authMiddleware';

const prisma = new PrismaClient();

// Handle POST request to create a new user
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

// Handle GET request to return a dummy response (requires token)
export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const verified = await verifyToken(token);

    const dummyData = {
      message: "This is a dummy response from /api/users",
      users: [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" },
      ],
    };

    return NextResponse.json(dummyData, { status: 200 });
  } catch (error) {
    console.error('Failed to verify token:', error);
    return NextResponse.json({ error: 'Failed to verify token' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
