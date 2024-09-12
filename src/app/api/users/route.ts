import { NextResponse } from 'next/server';
import { PrismaClient, Gender } from '@prisma/client';
import { verifyToken } from '@/lib/authMiddleware';

const prisma = new PrismaClient();

// Handle POST request to create a new user
export async function POST(req: Request) {
  try {
    const { email, name, username, gender }: { email: string; name?: string; username: string; gender: Gender } = await req.json();


    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        username,
        gender
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Failed to create user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}


// Handle GET request to fetch authenticated user's details
export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const verified = await verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { email: verified.email },
      include: {
        achievements: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Failed to verify token or fetch user:', error);
    return NextResponse.json({ error: 'Failed to fetch user information' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// Handle PATCH request to update user details
export async function PATCH(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const verified = await verifyToken(token);
    const { email, name, username, gender, lessons, achievements, transcripts } = await req.json(); // Include all fields

    const updatedUser = await prisma.user.update({
      where: { email: verified.email },
      data: {
        email,
        name,
        username,
        gender,
        lessons,
        achievements,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Failed to update user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// Handle DELETE request to remove the authenticated user
export async function DELETE(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const verified = await verifyToken(token);

    await prisma.user.delete({
      where: { email: verified.email },
    });

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Failed to delete user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}