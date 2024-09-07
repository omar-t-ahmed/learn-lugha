import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/authMiddleware';

const prisma = new PrismaClient();

// Handle POST request to create a new lesson
export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const verified = await verifyToken(token);
    const { title, content } = await req.json();

    const newLesson = await prisma.lesson.create({
      data: {
        title,
        content,
        userId: verified.userId, // Assuming userId is available in the token
      },
    });

    return NextResponse.json(newLesson, { status: 201 });
  } catch (error) {
    console.error('Failed to create lesson:', error);
    return NextResponse.json({ error: 'Failed to create lesson' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// Handle GET request to fetch all lessons for the authenticated user
export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const verified = await verifyToken(token);

    const lessons = await prisma.lesson.findMany({
      where: { userId: verified.userId }, // Assuming userId is available in the token
    });

    return NextResponse.json(lessons, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch lessons:', error);
    return NextResponse.json({ error: 'Failed to fetch lessons' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}