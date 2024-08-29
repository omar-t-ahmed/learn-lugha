import { NextResponse } from 'next/server';
import { SpeechClient, protos } from '@google-cloud/speech';
import { Writable } from 'stream';
import { fileTypeFromBuffer } from 'file-type';

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const requestBody = await req.json();
    const { audioContent } = requestBody;

    if (!audioContent) {
      return NextResponse.json({ transcription: '', error: 'No audio content provided' });
    }

    const buffer = Buffer.from(audioContent, 'base64');
    const type = await fileTypeFromBuffer(buffer);

    if (!type || type.ext !== 'webm') {
      return NextResponse.json({ transcription: '', error: `Unsupported file type: ${type?.ext || 'unknown'}` });
    }

    const config: protos.google.cloud.speech.v1.IStreamingRecognitionConfig = {
      config: {
        encoding: protos.google.cloud.speech.v1.RecognitionConfig.AudioEncoding.WEBM_OPUS,
        languageCode: 'ar-SA',
        audioChannelCount: 1,
        sampleRateHertz: 48000,
      },
      interimResults: false, // Set to false to get the final result
    };

    let transcription = '';

    const client = new SpeechClient({
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS!,
    });

    // Wrap the streaming process in a Promise to handle async behavior properly
    const transcriptionPromise = new Promise<NextResponse>((resolve, reject) => {
      const recognizeStream = client
        .streamingRecognize(config)
        .on('data', data => {
          if (data.results[0] && data.results[0].alternatives[0]) {
            transcription += data.results[0].alternatives[0].transcript;
          }
        })
        .on('error', error => {
          reject(NextResponse.json({ transcription: '', error: 'Error during streaming' }));
        })
        .on('end', () => {
          resolve(NextResponse.json({ transcription }));
        });

      streamAudio(buffer, recognizeStream).catch(error => {
        recognizeStream.destroy();
        reject(NextResponse.json({ transcription: '', error: 'Error streaming audio' }));
      });
    });

    return transcriptionPromise;

  } catch (error) {
    return NextResponse.json({ transcription: '', error: 'Error occurred during processing' });
  }
}

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

    await new Promise(resolve => setTimeout(resolve, 5)); // Reduced delay for faster processing // Simulate streaming
  }

  if (!recognizeStream.writableEnded && !recognizeStream.destroyed) {
    recognizeStream.end();
  }
}