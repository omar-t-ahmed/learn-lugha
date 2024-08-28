import { NextResponse } from 'next/server';
import { SpeechClient, protos } from '@google-cloud/speech';
import * as fs from 'fs';

interface SpeechToTextRequest {
  audioFilePath: string; // Path to the local audio file
}

export async function POST(req: Request): Promise<NextResponse> {
  const { audioFilePath } = await req.json() as SpeechToTextRequest;

  // Create a new Speech client
  const client = new SpeechClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS!, // Path to your service account key file
  });

  // Read the audio file into memory
  const audioBytes = fs.readFileSync(audioFilePath).toString('base64');

  // Configure the request
  const audio: protos.google.cloud.speech.v1.RecognitionAudio = {
    content: audioBytes,
    toJSON: function (): { [k: string]: any; } {
      throw new Error('Function not implemented.');
    }
  };

  const config: protos.google.cloud.speech.v1.RecognitionConfig = {
    encoding: protos.google.cloud.speech.v1.RecognitionConfig.AudioEncoding.LINEAR16,
    sampleRateHertz: 16000,
    languageCode: 'ar-SA',
    audioChannelCount: 0,
    enableSeparateRecognitionPerChannel: false,
    alternativeLanguageCodes: [],
    maxAlternatives: 0,
    profanityFilter: false,
    speechContexts: [],
    enableWordTimeOffsets: false,
    enableWordConfidence: false,
    enableAutomaticPunctuation: false,
    model: '',
    useEnhanced: false,
    toJSON: function (): { [k: string]: any; } {
      throw new Error('Function not implemented.');
    }
  };

  const request: protos.google.cloud.speech.v1.RecognizeRequest = {
    audio: audio,
    config: config,
    toJSON: function (): { [k: string]: any; } {
      throw new Error('Function not implemented.');
    }
  };

  // Detects speech in the audio file
  const [response] = await client.recognize(request);

  const transcription = response.results
    ?.map(result => result.alternatives?.[0].transcript)
    .join('\n') || '';

  return NextResponse.json({ transcription });
}
