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
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS!,
  });

  // Translate the text
  const [translatedText] = await translateClient.translate(text, targetLanguage);

  return NextResponse.json({ translatedText });
}