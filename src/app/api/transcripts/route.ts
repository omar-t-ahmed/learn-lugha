import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/authMiddleware';

const prisma = new PrismaClient();

// Handle POST request to create a new transcript
export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const verified = await verifyToken(token);
    const { content, lessonId } = await req.json();

    const newTranscript = await prisma.transcript.create({
      data: {
        content,
        lessonId,
        userId: verified.userId, // Assuming userId is available in the token
      },
    });

    return NextResponse.json(newTranscript, { status: 201 });
  } catch (error) {
    console.error('Failed to create transcript:', error);
    return NextResponse.json({ error: 'Failed to create transcript' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// Handle GET request to fetch all transcripts for the authenticated user
export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const verified = await verifyToken(token);

    const transcripts = await prisma.transcript.findMany({
      where: { userId: verified.userId }, // Assuming userId is available in the token
    });

    return NextResponse.json(transcripts, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch transcripts:', error);
    return NextResponse.json({ error: 'Failed to fetch transcripts' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}