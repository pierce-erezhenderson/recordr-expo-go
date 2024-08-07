import { StyleSheet, View, Text } from 'react-native';
import React, { useEffect, useCallback } from 'react';
import { useRecognize } from "../../utils/RecognizeContext.jsx";
import { useSuccess } from "../../utils/SuccessContext.jsx";
import { useLoading } from "../../utils/LoadingContext.jsx";
import useRecordr from '../../hooks/useRecordr.jsx';
// import submitNewNote from '../../services/invoiceAPI';
import StarterView from '../views/StarterView.jsx';
import RecognizeView from '../views/RecognizeView.jsx';
import TranscriptionView from '../views/TranscriptionView.jsx';
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
        cancelRecording,
        invoiceData,
        setInvoiceData,
    } = useRecordr();
    // const {
    //     clients, 
    //     setClients
    // } = useInvoices();


    const handleSetLoading = (isLoading) => {
        setLoading(isLoading);
    };

    // const updateInvoice = useCallback(async (transcription) => {
    //     handleSetLoading(true);
    //     await submitNewNote(transcription);
    //     handleSetLoading(false);
    // }, [handleSetLoading, submitTranscription]);

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

    const handleGetClientInvoices = async () => {
        handleSetLoading(true);
        setError(null);
        try {
            const data = await fetchClientInvoices();
            setInvoiceData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            handleSetLoading(false);
        }
    }

    // maybe add a clearalldata function later

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
            case serverResponse: return <TranscriptionView
                transcription={transcription}
                updateInvoice={updateInvoice}
                handleRedo={handleRedo}
                setTranscription={setTranscription}
                // submitTranscription={submitTranscription}
                invoiceData={invoiceData}
            />;
            case recognize: return <RecognizeView
                recognize={recognize} 
                handleSetLoading={handleSetLoading}
                handleRedo={handleRedo}
                stopRecording={stopRecording}
                handleGetClientInvoices={handleGetClientInvoices}
            />;
            default: return <StarterView 
                startRecording={startRecording}
                setRecognize={setRecognize}
            />;
        };
    };

    return (
        <View style={[ styles.recordrContainer, { backgroundColor: getBackgroundColor() } ]}>
            {getRecordrUI()}
            {/* {submitError && <Text style={styles.errorText}>{submitError}</Text>} */}
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