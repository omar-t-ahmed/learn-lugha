import { NextResponse } from 'next/server';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import Translate from '@google-cloud/translate';

interface TranslationRequest {
  text: string;
  targetLanguage: string;
}

interface TextToSpeechRequest {
  text: string;
  languageCode?: string;
  voiceName?: string;
  audioEncoding?: 'MP3' | 'LINEAR16' | 'OGG_OPUS';
}

// Translation Route
export async function POST(req: Request): Promise<NextResponse> {
  const { text, targetLanguage } = await req.json() as TranslationRequest;

  // Create a new Translation client using v2 API
  const translateClient = new Translate.v2.Translate({
    credentials: {
      type: process.env.GOOGLE_TYPE!,
      project_id: process.env.GOOGLE_PROJECT_ID!,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID!,
      private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLIENT_EMAIL!,
      client_id: process.env.GOOGLE_CLIENT_ID!,
    }
  });

  // Translate the text
  const [translatedText] = await translateClient.translate(text, targetLanguage);

  return NextResponse.json({ translatedText });
}