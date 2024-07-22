import { StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { useRecognize } from "../utils/RecognizeContext.jsx";
import { useSuccess } from "../utils/SuccessContext.jsx";
import { useLoading } from "../utils/LoadingContext.jsx";
import useSpeechRecognition from '../hooks/useSpeechRecognition';
import useSubmitRecordr from '../hooks/useSubmitRecordr';
import StarterUI from './StarterUI';
import RecognizeUI from './RecognizeUI';
import TranscriptionUI from './TranscriptionUI';
import LoadingAnimation from './LoadingAnimation';
import SuccessAnimation from './SuccessAnimation';
import ImageCycler from './ImageCycler.jsx'; 


const Recordr = () => {
    const { recognize, setRecognize } = useRecognize();
    const { success, setSuccess } = useSuccess();
    const { loading, setLoading } = useLoading();
    const { 
        startRecording, 
        stopRecording,
        transcription, 
        setTranscription, 
        serverResponse,
        cancelRecording
    } = useSpeechRecognition()

    const submitAllFields = (transcription) => {
        useSubmitRecordr(transcription);
    };

    const handleSetLoading = (isLoading) => {
        setLoading(isLoading);
    };

    const handleRedo = () => {
        handleSetLoading(true);
        // Add any redo logic here
        setTimeout(() => {
            handleSetLoading(false);
            setRecognize(true); // Transition to RecognizeUI
        }, 2000); // 2 second artificial loading
    };

    useEffect(() => {
        if (serverResponse) {
            handleSetLoading(false);
        }
    }, [serverResponse]);

    const getBackgroundColor = () => {
        if (serverResponse) {  
            return '#c4d1a4';
        }
        if (recognize) {
            return '#f2d8c7';
        }
        return '#d1cecc';
    };

    const getRecordrUI = () => {
        switch (true) {
            case loading: 
                return (
                    <View style={styles.loadingContainer}>
                        <ImageCycler />
                        <LoadingAnimation style={{marginBottom: 50}} />
                    </View>
                );
            case success: return <SuccessAnimation />;
            case serverResponse: return <TranscriptionUI
                transcription={transcription}
                submitAllFields={submitAllFields}
                handleRedo={handleRedo}
                setTranscription={setTranscription}
            />;
            case recognize: return <RecognizeUI
                recognize={recognize} 
                handleSetLoading={handleSetLoading}
                handleRedo={handleRedo}
                stopRecording={stopRecording}
            />;
            default: return <StarterUI 
                handleSetLoading={handleSetLoading}
                startRecording={startRecording}
                setRecognize={setRecognize}
            />;
        };
    };

    return (
        <View style={[
            styles.recordrContainer, 
            { backgroundColor: getBackgroundColor() }
        ]}>
            {getRecordrUI()}
        </View>
    ); 
};

const styles = StyleSheet.create({
    recordrContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 260
    },
});

export default Recordr;