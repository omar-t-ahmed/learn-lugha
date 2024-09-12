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
    const { level } = await req.json();

    const newProgress = await prisma.progress.create({
      data: {
        level,
        userId: verified.userId, // Assuming userId is available in the token
      },
    });

    return NextResponse.json(newProgress, { status: 201 });
  } catch (error) {
    console.error('Failed to create progress:', error);
    return NextResponse.json({ error: 'Failed to create progress' }, { status: 500 });
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