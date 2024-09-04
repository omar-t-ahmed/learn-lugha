import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/authMiddleware';

const prisma = new PrismaClient();

// Handle POST request to create a new achievement
export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const verified = await verifyToken(token);
    const { title, description } = await req.json();

    const newAchievement = await prisma.achievement.create({
      data: {
        title,
        description,
        userId: verified.userId, // Assuming userId is available in the token
      },
    });

    return NextResponse.json(newAchievement, { status: 201 });
  } catch (error) {
    console.error('Failed to create achievement:', error);
    return NextResponse.json({ error: 'Failed to create achievement' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// Handle GET request to fetch all achievements for the authenticated user
export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const verified = await verifyToken(token);

    const achievements = await prisma.achievement.findMany({
      where: { userId: verified.userId }, // Assuming userId is available in the token
    });

    return NextResponse.json(achievements, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch achievements:', error);
    return NextResponse.json({ error: 'Failed to fetch achievements' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}