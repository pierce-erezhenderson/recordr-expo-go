import { StyleSheet, View, Text } from 'react-native';
import React, { useEffect, useCallback } from 'react';
import { useRecognize } from "../../utils/RecognizeContext.jsx";
import { useSuccess } from "../../utils/SuccessContext.jsx";
import { useLoading } from "../../utils/LoadingContext.jsx";
import useSpeechRecognition from '../../hooks/useSpeechRecognition.jsx';
import useSubmitRecordr from '../../hooks/useSubmitRecordr.jsx';
import StarterUI from '../UI/StarterUI.jsx';
import RecognizeUI from '../UI/RecognizeUI.jsx';
import TranscriptionUI from '../UI/TranscriptionUI.jsx';
import LoadingAnimation from '../bobs/LoadingAnimation.jsx';
import SuccessAnimation from '../bobs/SuccessAnimation.jsx';
import ImageCycler from '../bobs/ImageCycler.jsx'; 


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
        setServerResponse,
        cancelRecording
    } = useSpeechRecognition()
    const { submitTranscription, error: submitError } = useSubmitRecordr();

    const handleSetLoading = (isLoading) => {
        setLoading(isLoading);
    };

    const submitAllFields = useCallback(async (transcription) => {
        handleSetLoading(true);
        await submitTranscription(transcription);
        handleSetLoading(false);
    }, [handleSetLoading, submitTranscription]);

    const handleRedo = useCallback(() => {
        handleSetLoading(true);
        setTranscription('');
        setRecognize(false);
        setServerResponse(false);
        // Add any redo logic here
        setTimeout(() => {
            handleSetLoading(false);
        }, 2000); // 2 second artificial loading
    }, [handleSetLoading, setRecognize]);


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
                submitTranscription={submitTranscription}
            />;
            case recognize: return <RecognizeUI
                recognize={recognize} 
                handleSetLoading={handleSetLoading}
                handleRedo={handleRedo}
                stopRecording={stopRecording}
            />;
            default: return <StarterUI 
                startRecording={startRecording}
                setRecognize={setRecognize}
            />;
        };
    };

    return (
        <View style={[ styles.recordrContainer, { backgroundColor: getBackgroundColor() } ]}>
            {getRecordrUI()}
            {submitError && <Text style={styles.errorText}>{submitError}</Text>}
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