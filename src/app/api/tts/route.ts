import { NextResponse } from 'next/server';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

interface TextToSpeechRequest {
  text: string;
  languageCode?: string;
  voiceName?: string;
  audioEncoding?: 'MP3' | 'LINEAR16' | 'OGG_OPUS';
}

export async function POST(req: Request): Promise<Response> {
  try {
    const { text, languageCode = 'ar-SA', voiceName = 'ar-XA-Standard-B', audioEncoding = 'MP3' } = await req.json() as TextToSpeechRequest;

    // Ensure the necessary environment variables are present
    if (!process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PROJECT_ID) {
      return new Response(JSON.stringify({ error: "Missing Google Cloud environment variables" }), { status: 500 });
    }

    // Create a new Text-to-Speech client using environment variables
    const client = new TextToSpeechClient({
      credentials: {
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
      },
      projectId: process.env.GOOGLE_PROJECT_ID,
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

    // Perform the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);

    // If no audio content is returned
    if (!response.audioContent) {
      return new Response(JSON.stringify({ error: 'Failed to generate audio' }), { status: 500 });
    }

    // Return the audio content as a binary response
    return new Response(response.audioContent as Buffer, {
      headers: {
        'Content-Type': `audio/${audioEncoding.toLowerCase()}`,
        'Content-Disposition': `inline; filename="output.${audioEncoding.toLowerCase()}"`,
      },
    });
  } catch (error) {
    console.error('Error during TTS request:', error);
    return new Response(JSON.stringify({ error: 'TTS request failed' }), { status: 500 });
  }
}