import { getAccessToken } from '../auth/googleAuth.mjs';
import ffmpeg from 'fluent-ffmpeg';
import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';

async function speechToText(audioBuffer) {
    try {
        console.log('Starting speech-to-text conversion');
        const convertedAudio = await convertToLinear16(audioBuffer);
        console.log('Audio converted to LINEAR16');
        
        const accessToken = await getAccessToken();
        console.log('Access token obtained');

        const response = await fetch('https://speech.googleapis.com/v1/speech:recognize', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                config: {
                    encoding: 'LINEAR16',
                    sampleRateHertz: 16000,
                    languageCode: 'en-US',
                    model: 'default',
                    useEnhanced: true,
                },
                audio: {
                    content: convertedAudio.toString('base64'),
                },
            }),
        });

        console.log('Request sent to Google API');

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response from Google API:', response.status, errorText);
            throw new Error(`Error from Google API: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        console.log('Response received from Google API:', JSON.stringify(data, null, 2));

        if (data.results && data.results.length > 0) {
            const transcription = data.results
                .filter(result => result.alternatives && result.alternatives[0] && result.alternatives[0].transcript)
                .map(result => result.alternatives[0].transcript.trim())
                .join(' ');
            
            if (transcription) {
                console.log('Full Transcription:', transcription);
                return transcription;
            } else {
                console.error('No valid transcription found in the response');
                throw new Error('No valid transcription available');
            }
        } else {
            console.error('No results available in the response');
            throw new Error('No transcription results available');
        }

    } catch (error) {
        console.error('Error in speech-to-text conversion:', error);
        throw error;
    }
}

async function convertToLinear16(inputBuffer) {
    console.log('Starting audio conversion, input buffer length:', inputBuffer.length);

    const inputPath = path.join(os.tmpdir(), `input-${Date.now()}.webm`);
    const outputPath = path.join(os.tmpdir(), `output-${Date.now()}.wav`);

    await fs.writeFile(inputPath, inputBuffer);
    console.log('Input file written:', inputPath);

    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .outputOptions([
                '-acodec pcm_s16le',
                '-ar 16000',
                '-ac 1'
            ])
            .save(outputPath)
            .on('end', async () => {
                console.log('FFmpeg conversion completed');
                const data = await fs.readFile(outputPath);
                console.log('Converted audio file read, length:', data.length);
                await fs.unlink(inputPath);
                await fs.unlink(outputPath);
                resolve(data);
            })
            .on('error', (err) => {
                console.error('FFmpeg error:', err);
                reject(err);
            });
    });
}

export { speechToText };