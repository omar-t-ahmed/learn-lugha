'use client';
import React, { useState } from 'react';
import axios from 'axios';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

const ConversationApp = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcription, setTranscription] = useState('');
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    let mediaRecorder: MediaRecorder;
    let audioChunks: Blob[] = [];
    let silenceTimeout: NodeJS.Timeout | null = null;
    const silenceThreshold = 24; // Adjusted for RMS value based on observed data
    const silenceDuration = 1500; // Time in milliseconds to detect silence

    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
                mediaRecorder.start();
                setIsRecording(true);

                const audioContext = new AudioContext();
                const source = audioContext.createMediaStreamSource(stream);
                const analyser = audioContext.createAnalyser();
                analyser.fftSize = 512;
                source.connect(analyser);

                const dataArray = new Uint8Array(analyser.frequencyBinCount);

                const checkSilence = () => {
                    analyser.getByteFrequencyData(dataArray);
                    const rms = Math.sqrt(dataArray.reduce((sum, value) => sum + value * value, 0) / dataArray.length);

                    console.log('RMS:', rms);

                    if (rms < silenceThreshold) {
                        if (!silenceTimeout) {
                            silenceTimeout = setTimeout(() => {
                                stopRecording();
                            }, silenceDuration);
                        }
                    } else {
                        if (silenceTimeout) {
                            clearTimeout(silenceTimeout);
                            silenceTimeout = null;
                        }
                    }

                    if (mediaRecorder.state === 'recording') {
                        requestAnimationFrame(checkSilence);
                    }
                };

                checkSilence();

                mediaRecorder.ondataavailable = function(event) {
                    if (event.data && event.data.size > 0) {
                        audioChunks.push(event.data);
                    }
                };

                mediaRecorder.onstop = async function() {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });

                    if (audioBlob.size > 0) {
                        const audioUrl = URL.createObjectURL(audioBlob);
                        setAudioUrl(audioUrl);

                        const reader = new FileReader();
                        reader.onloadend = async function() {
                            if (reader.result) {
                                const base64String = reader.result as string;

                                try {
                                    const sttResponse = await axios.post('/api/stt', {
                                        audioContent: base64String.split(',')[1],
                                    });

                                    console.log('Received transcription:', sttResponse.data.transcription);
                                    setTranscription(sttResponse.data.transcription);
                                } catch (error) {
                                    console.error('Error receiving transcription:', error);
                                }
                            }
                        };
                        reader.readAsDataURL(audioBlob);
                    }
                };
            })
            .catch(error => {
                setIsRecording(false);
                console.error('Error accessing media devices:', error);
            });
    };

    const stopRecording = () => {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
            setIsRecording(false);
        }
    };

    return (
        <div className='bg-white text-black'>
            <MaxWidthWrapper className="py-10 flex flex-col justify-between items-center">
                <button onClick={startRecording} disabled={isRecording}>
                    {isRecording ? 'Recording...' : 'Start Recording'}
                </button>

                {transcription && (
                    <div className='py-5'>
                        <h2 className='text-3xl py-5 text-center'>Transcription:</h2>
                        <p className='text-3xl'>{transcription}</p>
                    </div>
                )}
            </MaxWidthWrapper>
        </div>
    );
};

export default ConversationApp;