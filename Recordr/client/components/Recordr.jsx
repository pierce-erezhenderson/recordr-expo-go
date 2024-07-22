import { StyleSheet, View } from 'react-native';
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

    const updateField = (field) => (text) => {
        setTranscription(prevState => ({
            ...prevState,
            [field]: text
        }));
    };

    const submitAllFields = (transcription) => {
        useSubmitRecordr(transcription);
    };

    const handleSetLoading = ({redo}) => {
        setLoading(true);
        console.log('Loading...');

        setTimeout(() => {
            setLoading(false);
            if (!recognize) {
                setRecognize(true);
                startRecording();
            } else if (redo) {
                setRecognize(false);
                cancelRecording();
                setTranscription({});
            } else {
                setRecognize(false);
                stopRecording();
            }   
        }, 2000);
    };

    const handleRedo = () => {
        const redo = true;
        handleSetLoading(redo);
    };

    const getBackgroundColor = () => {
        if (serverResponse) {  
            return '#b6c299';
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
                updateField={updateField}
                submitAllFields={submitAllFields}
            />;
            case recognize: return <RecognizeUI
                recognize={recognize} 
                handleSetLoading={handleSetLoading}
                handleRedo={handleRedo}
            />;
            default: return <StarterUI handleSetLoading={handleSetLoading} />;
        }
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