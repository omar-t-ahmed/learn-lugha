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
        gender,
        progress: {
            level: 1,
            xp: 0
        } // Initialize progress
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
    const { email, name, username, gender, lessons, achievements, completedLesson, tutorialCompleted } = await req.json(); // Include tutorialCompleted in request body

    // Fetch current progress
    const user = await prisma.user.findUnique({
      where: { email: verified.email },
      select: { progress: true }
    });

    if (!user || !user.progress) {
      return NextResponse.json({ error: 'User or progress not found' }, { status: 404 });
    }

    const progress = user.progress as { level: number; xp: number }; // Explicitly type progress
    let { level, xp } = progress ? progress : { level: 1, xp: 0 }; // Default to level 1, 0 XP if progress doesn't exist
    if (completedLesson) {
      xp = (xp || 0) + 20; // Ensure xp is not null and add 20 XP
      if (xp >= 100) {
        level += 1; // Increment level
        xp = 0; // Reset xp to 0
      }
    }

    const updatedUser = await prisma.user.update({
      where: { email: verified.email },
      data: {
        email,
        name,
        username,
        gender,
        lessons,
        achievements,
        progress,
        tutorialCompleted, // Update tutorialCompleted field
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