import { NextResponse } from 'next/server';
import { SpeechClient, protos } from '@google-cloud/speech';

export async function POST(req: Request): Promise<NextResponse> {
  const { audioContent } = await req.json();

  // Create a new Speech client
  const client = new SpeechClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS!,
  });

  // Configure the request with minimal necessary options
  const audio: protos.google.cloud.speech.v1.RecognitionAudio = {
    content: audioContent,
    toJSON: function (): { [k: string]: any; } {
      return { content: this.content };
    }
  };

  const config: Partial<protos.google.cloud.speech.v1.RecognitionConfig> = {
    languageCode: 'ar-SA', // Language of the audio
    audioChannelCount: 1,  // Assume mono-channel audio
    maxAlternatives: 1,    // Only get the most likely transcription
    profanityFilter: false, // No need to filter profanity
    model: 'default',       // Use the default model for faster processing
    toJSON: function (): { [k: string]: any; } {
      return {
        languageCode: this.languageCode,
        audioChannelCount: this.audioChannelCount,
        maxAlternatives: this.maxAlternatives,
        profanityFilter: this.profanityFilter,
        model: this.model,
      };
    }
  };

  try {
    // Detects speech in the audio content
    const [response] = await client.recognize({
      audio: audio,
      config: config,
    });

    const transcription = response.results
      ?.map(result => result.alternatives?.[0].transcript)
      .join('\n') || '';

    return NextResponse.json({ transcription });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ transcription: '', error: error.message });
    } else {
      return NextResponse.json({ transcription: '', error: 'Unknown error occurred' });
    }
  }
}
