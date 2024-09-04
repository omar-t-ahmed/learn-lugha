import { NextResponse } from 'next/server';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

interface TextToSpeechRequest {
  text: string;
  languageCode?: string;
  voiceName?: string;
  audioEncoding?: 'MP3' | 'LINEAR16' | 'OGG_OPUS';
}

export async function POST(req: Request): Promise<NextResponse> {
  const { text, languageCode = 'ar-SA', voiceName = 'ar-XA-Standard-B', audioEncoding = 'MP3' } = await req.json() as TextToSpeechRequest;

  // Create a new Text-to-Speech client using environment variables
  const client = new TextToSpeechClient({
    credentials: {
      private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLIENT_EMAIL!,
    },
    projectId: process.env.GOOGLE_PROJECT_ID!,
  });

  // Configure the request
  const request = {
    input: { text },
    voice: {
      languageCode,
      name: voiceName,
    },
    audioConfig: {
      audioEncoding: audioEncoding as any,
    },
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);

  // Return the audio content as a binary response
  return new NextResponse(response.audioContent as Buffer, {
    headers: {
      'Content-Type': `audio/${audioEncoding.toLowerCase()}`,
      'Content-Disposition': `inline; filename="output.${audioEncoding.toLowerCase()}"`
    }
  });
}