import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/authMiddleware';

const prisma = new PrismaClient();

// Handle POST request to create a new progress entry
export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const verified = await verifyToken(token);
    const { xpGained } = await req.json(); // Assume xpGained is sent in the request body

    // Fetch the current progress of the user
    let progress = await prisma.progress.findUnique({
      where: { userId: verified.userId },
    });

    if (!progress) {
      // If no progress entry exists, create one with initial values
      progress = await prisma.progress.create({
        data: {
          level: 0,
          xp: 0,
          userId: verified.userId,
        },
      });
    }

    // Add XP to the user's current XP
    let newXP = progress.xp + xpGained;
    let newLevel = progress.level;

    // Check if the XP exceeds 100 and update the level and XP accordingly
    if (newXP >= 100) {
      newLevel += 1;
      newXP = newXP % 100; // Remainder becomes the new XP
    }

    // Update the user's progress
    const updatedProgress = await prisma.progress.update({
      where: { userId: verified.userId },
      data: {
        level: newLevel,
        xp: newXP,
      },
    });

    return NextResponse.json(updatedProgress, { status: 201 });
  } catch (error) {
    console.error('Failed to update progress:', error);
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// Handle GET request to fetch all progress entries for the authenticated user
export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const verified = await verifyToken(token);

    const progressEntries = await prisma.progress.findMany({
      where: { userId: verified.userId }, // Assuming userId is available in the token
    });

    return NextResponse.json(progressEntries, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch progress entries:', error);
    return NextResponse.json({ error: 'Failed to fetch progress entries' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}