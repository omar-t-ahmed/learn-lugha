import { NextResponse } from 'next/server';
import { SpeechClient, protos as speechProtos } from '@google-cloud/speech';
import OpenAI from 'openai';
import { TextToSpeechClient, protos as ttsProtos } from '@google-cloud/text-to-speech';
import { Writable } from 'stream';
import { fileTypeFromBuffer } from 'file-type';

// Function to handle speech-to-text
async function handleSpeechToText(audioContent: string): Promise<string> {
  const buffer = Buffer.from(audioContent, 'base64');
  const type = await fileTypeFromBuffer(buffer);

  if (!type || type.ext !== 'webm') {
    throw new Error(`Unsupported file type: ${type?.ext || 'unknown'}`);
  }

  const config: speechProtos.google.cloud.speech.v1.IStreamingRecognitionConfig = {
    config: {
      encoding: speechProtos.google.cloud.speech.v1.RecognitionConfig.AudioEncoding.WEBM_OPUS,
      languageCode: 'ar-SA',
      audioChannelCount: 1,
      sampleRateHertz: 48000,
    },
    interimResults: false,
  };

  let transcription = '';

  const client = new SpeechClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS!,
  });

  const transcriptionPromise = new Promise<string>((resolve, reject) => {
    const recognizeStream = client
      .streamingRecognize(config)
      .on('data', data => {
        if (data.results[0] && data.results[0].alternatives[0]) {
          transcription += data.results[0].alternatives[0].transcript;
        }
      })
      .on('error', error => {
        reject(new Error('Error during streaming'));
      })
      .on('end', () => {
        resolve(transcription);
      });

    streamAudio(buffer, recognizeStream).catch(error => {
      recognizeStream.destroy();
      reject(new Error('Error streaming audio'));
    });
  });

  return transcriptionPromise;
}

// Function to handle text processing with OpenAI
async function handleOpenAI(input: string): Promise<string> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  });

  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'You are an Arabic language assistant.' },
      { role: 'user', content: input },
    ],
    model: 'gpt-4',
  });

  return completion.choices[0].message.content ?? 'No content available';
}

// Function to handle text-to-speech
async function handleTextToSpeech(text: string): Promise<Buffer> {
  const client = new TextToSpeechClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS!,
  });

  const request: ttsProtos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest = {
    input: { text },
    voice: {
      languageCode: 'ar-SA',
      name: 'ar-XA-Standard-B',
    },
    audioConfig: {
      audioEncoding: ttsProtos.google.cloud.texttospeech.v1.AudioEncoding.MP3,
    },
  };

  const [response] = await client.synthesizeSpeech(request);
  return response.audioContent as Buffer;
}

// Helper function to stream audio
async function streamAudio(buffer: Buffer, recognizeStream: Writable): Promise<void> {
  const chunkSize = 4096;

  for (let i = 0; i < buffer.length; i += chunkSize) {
    const chunk = buffer.slice(i, i + chunkSize);

    if (recognizeStream.writableEnded || recognizeStream.destroyed) {
      break;
    }

    try {
      recognizeStream.write(chunk);
    } catch (error) {
      recognizeStream.destroy();
      break;
    }

    await new Promise(resolve => setTimeout(resolve, 5)); // Reduced delay for faster processing
  }

  if (!recognizeStream.writableEnded && !recognizeStream.destroyed) {
    recognizeStream.end();
  }
}

// Main handler for the unified conversation route
export async function POST(req: Request): Promise<NextResponse> {
  try {
    const requestBody = await req.json();
    const { audioContent } = requestBody;

    if (!audioContent) {
      return NextResponse.json({ transcription: '', error: 'No audio content provided' });
    }

    // Step 1: Speech to Text
    const transcription = await handleSpeechToText(audioContent);

    // Step 2: Process with OpenAI
    const openAIResponse = await handleOpenAI(transcription);

    // Step 3: Text to Speech
    const audioBuffer = await handleTextToSpeech(openAIResponse);

    // Return the audio content as a binary response
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mp3',
        'Content-Disposition': 'inline; filename="response.mp3"',
      },
    });

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' });
    }
  }
}
