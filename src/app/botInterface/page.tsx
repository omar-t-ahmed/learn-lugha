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

    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            setIsRecording(true);

            mediaRecorder.ondataavailable = function(event) {
                if (event.data && event.data.size > 0) {
                    audioChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = async function() {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });

                if (audioBlob.size > 0) {
                    const audioUrl = URL.createObjectURL(audioBlob);
                    setAudioUrl(audioUrl);

                    const reader = new FileReader();
                    reader.onloadend = async function() {
                        if (reader.result) {
                            const base64String = reader.result as string;
                            
                            const sttResponse = await axios.post('/api/stt', {
                                audioContent: base64String.split(',')[1],
                            });
                            
                            const transcriptionText = sttResponse.data.transcription;
                            setTranscription(transcriptionText);
                        }
                    };
                    reader.readAsDataURL(audioBlob);
                }
            };

            setTimeout(() => {
                mediaRecorder.stop();
                setIsRecording(false);
            }, 5000); // 5 seconds
        })
        .catch(error => {
            setIsRecording(false);
        });
    };

    return (
        <div>
            <MaxWidthWrapper className="py-10 flex flex-col justify-between items-center">
                <button onClick={startRecording} disabled={isRecording}>
                    {isRecording ? 'Recording...' : 'Start Recording'}
                </button>

                {transcription && (
                    <div className='py-5'>
                        <h2>Transcription:</h2>
                        <p>{transcription}</p>
                    </div>
                )}
            </MaxWidthWrapper>
        </div>
    );
};

export default ConversationApp;