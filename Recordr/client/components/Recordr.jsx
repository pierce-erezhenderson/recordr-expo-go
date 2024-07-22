// import React, { useEffect, useState } from 'react';
import { 
    Text, 
    TextInput, 
    View, 
    StyleSheet, 
    TouchableOpacity, 
    TouchableWithoutFeedback, 
    Keyboard,
    SafeAreaView
} from 'react-native';
import { useRecognize } from "../utils/RecognizeContext.jsx";
import Svg, { G, Path, Polygon } from 'react-native-svg';
import useSpeechRecognition from '../hooks/useSpeechRecognition';
import ImageCycler from '../services/ImageCycler'

// UI components
import { Card } from 'react-native-paper';



// --------*** Recordr ***--------

const Recordr = () => {
    const { recognize, setRecognize } = useRecognize();
    const { 
        startRecording, 
        stopRecording, 
        // isRecording, 
        transcription, 
        setTranscription, 
        serverResponse 
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

    // -------- Starter UI --------

    const renderStarterContent = () => (
        <SafeAreaView style={styles.safeArea}>
        <View style={styles.starterContainer}>
            <Text style={styles.starterHeader}>Click below{'\n'}to record a note!</Text>
            <ImageCycler style={styles.imageCycler} />
            <TouchableOpacity style={styles.recordButton} onPress={startRecording}>
                <Text style={styles.recordButtonText}>Record</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.goToInvoicesButton} onPress={{/* Navigate to invoices page*/}}>
                <View style={styles.goToInvoicesButtonContainer}>
                    <Svg width={20} height={20}  viewBox="0 0 16.38 20.47">
                        <G fill="#616263" stroke-width="0">
                            <Polygon points="16.38 16.18 4.5 16.18 4.5 0 12.85 0 12.85 1 5.5 1 5.5 15.18 15.38 15.18 15.38 3.53 16.38 3.53 16.38 16.18" />
                            <Polygon points="11.88 20.47 0 20.47 0 4.29 3 4.29 3 5.29 1 5.29 1 19.47 10.88 19.47 10.88 17.68 11.88 17.68 11.88 20.47" />
                            <Polygon points="14.43 5.29 11.29 5.29 11.29 2.15 12.29 2.15 12.29 4.29 14.43 4.29 14.43 5.29" />
                            <Path d="M16.38,16.18H4.5V0h8.97l2.91,3.34v12.84ZM5.5,15.18h9.88V3.72l-2.37-2.72h-7.51v14.18Z" />
                        </G>
                    </Svg>
                    <Text style={styles.goToInvoicesButtonText}>Go to invoices</Text>
                </View>
            </TouchableOpacity>
        </View>
        </SafeAreaView>
    );


    // -------- Recognize UI --------

    const renderRecognizeContent = () => (
        <View style={styles.recognizeContainer}>
            <View style={styles.recognizeHeaderContainer}>
            <ImageCycler recognize={recognize} />
            </View>
            <View style={styles.instructionContainer} >
                <Text style={styles.instructionText}>Mention the date, hours,{'\n'}client, and details</Text>
            </View>
            <View style={styles.doneButtonContainer}>
                <TouchableOpacity
                    style={styles.doneButton}
                    activeOpacity={0.4}
                    onPress={stopRecording}
                >
                    <Text style={styles.doneButtonText} >Done</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.goToInvoicesButton} onPress={{/* Navigate to invoices page*/}}>
                <View style={styles.goToInvoicesButtonContainer}>
                    <Svg width={20} height={20}  viewBox="0 0 16.38 20.47">
                        <G fill="#616263" stroke-width="0">
                            <Polygon points="16.38 16.18 4.5 16.18 4.5 0 12.85 0 12.85 1 5.5 1 5.5 15.18 15.38 15.18 15.38 3.53 16.38 3.53 16.38 16.18" />
                            <Polygon points="11.88 20.47 0 20.47 0 4.29 3 4.29 3 5.29 1 5.29 1 19.47 10.88 19.47 10.88 17.68 11.88 17.68 11.88 20.47" />
                            <Polygon points="14.43 5.29 11.29 5.29 11.29 2.15 12.29 2.15 12.29 4.29 14.43 4.29 14.43 5.29" />
                            <Path d="M16.38,16.18H4.5V0h8.97l2.91,3.34v12.84ZM5.5,15.18h9.88V3.72l-2.37-2.72h-7.51v14.18Z" />
                        </G>
                    </Svg>
                    <Text style={styles.goToInvoicesButtonText}>Go to invoices</Text>
                </View>
            </TouchableOpacity>
        </View>
    );


    // -------- Transcription UI --------

    const renderTranscription = () => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.header}>Your invoice note!</Text>
                <Text style={styles.subheader}>Tap text boxes to edit details{transcription.invoice_id}</Text>
                <Card style={styles.cardContainer}>
                    <Text style={styles.invoice_id}>{transcription.invoice_id}</Text>
                    <Text style={styles.item}>{transcription.client}</Text>
                    <TextInput
                        style={styles.date}
                        value={transcription.date}
                        onChangeText={updateField('date')}
                        />
                    <TextInput
                        style={styles.hours}
                        value={transcription.hours}
                        onChangeText={updateField('hours')}
                        />
                    <TextInput
                        style={styles.details}
                        value={transcription.details}
                        onChangeText={updateField('details')}
                        />
                </Card>
                <TouchableOpacity style={styles.saveButton} onPress={submitAllFields}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </View>
      </TouchableWithoutFeedback>
    );


    // -------- Render loop --------
    
    const renderContent = () => {
        if (serverResponse) {
            return renderTranscription();
        } else if (recognize) {
            return renderRecognizeContent();
        } else {
            return renderStarterContent();
        }
    };

    return (
        <View style={styles.recordrContainer}>
            {renderContent()}
        </View>
    );
};



// --------*** Styles ***--------

const styles = StyleSheet.create({


    // -------- General styles --------

    recordrContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    goToInvoicesButton: {
        width: 130,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    goToInvoicesButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    goToInvoicesButtonText: {
        color: '#38332f',
        fontFamily: 'SuisseScreen-Regular',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    

    // -------- Starter UI styles --------

    starterContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    starterHeader: {
        fontFamily: 'SuisseWorks-Bold',
        fontSize: 35,
        lineHeight: 35,
        textAlign: 'center',
        color: '#38332f',
        marginTop: 50, // drops the header down a bit
        marginBottom: 40,
    },
    imageCycler: {
        // nothing for now
    },
    recordButton: {
        backgroundColor: '#38332f',
        borderRadius: 15,
        width: 200,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    recordButtonText: { 
        color: '#FFFFFF',
        fontFamily: 'SuisseScreen-Bold',
        fontSize: 22,
        fontWeight: 'bold',
    },


    // -------- Recognize UI Styles --------

    recognizeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
        
    },
    recognizeHeaderContainer: {
        marginTop: 50, // drops the image down a bit
    },
    instructionContainer: {
        marginTop: 20,
    },
    instructionText: {
        fontFamily: 'SuisseScreen-Regular',
        fontSize: 23,
        lineHeight: 35,
        color: '#47522b',
        textAlign: 'center',
        marginBottom: 50,
    },
    doneButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    doneButton: {
        backgroundColor: '#535f36',
        borderRadius: 25,
        width: 180,
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
    },
    doneButtonText: {
        color: '#FFFFFF',
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
    },

    
    // -------- Transcription UI styles --------

    cardContainer: {
        width: 350,
        height: 400,
        padding: 20,
        borderRadius: 20,
        backgroundColor: '#f6e3d5',
    },
    client: {
        fontFamily: 'Arial',
        fontSize: 20,
        fontWeight: 'bold',
    },
    details: {
        fontFamily: 'Arial',
        fontSize: 20,
        fontWeight: 'bold',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    hours: {
        fontFamily: 'Arial',
        fontSize: 20,
        fontWeight: 'bold',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    date: {
        fontFamily: 'Arial',
        fontSize: 20,
        fontWeight: 'bold',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
});

export default Recordr;