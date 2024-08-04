import { useState } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { useRecognize } from "../utils/RecognizeContext";
import { API_URL } from '../services/apiService';

const useSpeechRecognition = () => {
    const { setRecognize } = useRecognize();
    const [recording, setRecording] = useState(null);
    const [transcription, setTranscription] = useState({
        // client: 'Mom',
        // date: '2024-07-21',
        // hours: '2',
        // details: 'worked in garden',
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [serverResponse, setServerResponse] = useState(false);

    const startRecording = async () => {
        console.log('Starting recording...');
        try {
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);
            setRecognize(true);
            console.log('Recording started successfully'); 
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    };

    const stopRecording = async () => {
        console.log('Stopping recording...');
        setRecording(undefined);
        
        await recording.stopAndUnloadAsync();

        const uri = recording.getURI();
        console.log('Recording URI:', uri); 

        await processAudioFile(uri);

        setRecognize(false);
    };

    const cancelRecording = async () => {
        console.log('Cancelling recording...');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        setRecognize(false);
    };

    const processAudioFile = async (uri) => {
      try {
        console.log('Processing audio file...');
        setIsProcessing(true);
        
        const audioBase64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        
        const response = await fetch(`${API_URL}/api/generateRecordrNote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            audio: audioBase64,
          }),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setServerResponse(true);
        const transcriptionData = typeof data.response === 'string' ? JSON.parse(data.response) : data.response;
        console.log('Transcription:', transcriptionData);
        setTranscription(transcriptionData || {});
        
      } catch (error) {
        console.error('Error processing audio:', error);
        setTranscription('Error processing audio. Please try again.');
      } finally {
        setIsProcessing(false);
      }
    };
      
    return {
        startRecording,
        stopRecording,
        isRecording: Boolean(recording),
        setTranscription,
        transcription,
        serverResponse,
        setServerResponse,
        isProcessing,
        cancelRecording
    };
};

export default useSpeechRecognition;


// "date": "2024-7-13",
// "hours": "1.5",
// "client": "Jacksons",
// "details": "Picked up knobs and researched rugs"