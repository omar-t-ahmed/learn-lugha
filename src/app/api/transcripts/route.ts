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
    if (!verified) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { lessonId, messages } = await req.json();

    const userId = verified.uid; // Use the userId from the verified token

    const newTranscript = await prisma.transcript.create({
      data: {
        lessonId,
        userId, // Use the userId from the verified token
        messages, // Store the messages array
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

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const verified = await verifyToken(token);
    const userId = verified.uid;

    const url = new URL(req.url);
    const lessonId = parseInt(url.searchParams.get('lessonId') || '0', 10);

    if (!lessonId) {
      return NextResponse.json({ error: 'Lesson ID is required' }, { status: 400 });
    }

    // Fetch the transcript for the given lessonId and userId
    const transcript = await prisma.transcript.findFirst({
      where: {
        userId,
        lessonId,
      },
    });

    if (!transcript) {
      return NextResponse.json({ error: 'Transcript not found' }, { status: 404 });
    }

    return NextResponse.json(transcript, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch transcript:', error);
    return NextResponse.json({ error: 'Failed to fetch transcript' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}