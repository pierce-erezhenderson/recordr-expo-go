    import React, { useState, useRef, useEffect, useCallback } from 'react';
    import { 
        Text, 
        TextInput, 
        View, 
        StyleSheet, 
        TouchableOpacity, 
        Platform,
    } from 'react-native';
    import { Card } from 'react-native-paper';
    import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
    import PencilIcon from './PencilIcon';

    const TranscriptionUI = ({setTranscription, transcription, submitAllFields, handleRedo }) => {
        console.log('TranscriptionUI received:', transcription);
        
        const [tempTranscription, setTempTranscription] = useState(transcription);
        const [editingField, setEditingField] = useState(null);

        useEffect(() => {
            setTempTranscription(transcription);
        }, [transcription]);
    
        const updateField = useCallback((field) => (text) => {
            setTempTranscription(prevState => ({
                ...prevState,
                [field]: text
            }));
        }, []);
    
        const handleFocus = useCallback((field) => {
            setEditingField(field);
        }, []);
    
        const handleEndEditing = useCallback((field) => () => {
            if (editingField === field) {
                setEditingField(null);
                setTranscription(tempTranscription);
            }
        }, [editingField, tempTranscription, setTranscription]);
        
        const InputWithIcon = useCallback(({ field, value, onChangeText, style, multiline = false }) => {
            return (
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input, style]}
                        value={editingField === field ? tempTranscription[field] || '' : value !== undefined ? value.toString() : ''}
                        onChangeText={onChangeText}
                        onFocus={() => handleFocus(field)}
                        onEndEditing={handleEndEditing}
                        multiline={multiline}
                    />
                    {field === 'hours' && <Text style={{marginRight: 5}}>hrs</Text>}
                    <PencilIcon color="#47522b" size={20} style={styles.pencilIcon} />
                </View>
            );
        }, [editingField, tempTranscription, handleFocus, handleEndEditing]);

        
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={styles.scrollViewContent}
                extraScrollHeight={20}
                enableOnAndroid={true}
                keyboardShouldPersistTaps="handled"
            >
                <TouchableOpacity onPress={handleRedo} style={styles.redoButton}>
                    <Text style={styles.redoButtonText}>Redo</Text>
                </TouchableOpacity>
                <Card style={styles.cardContainer}>
                    <Text style={styles.client}>{transcription.client || ''}</Text>
                    <View style={styles.innerItems}>
                        <InputWithIcon
                            field="date"
                            value={transcription.date || ''}
                            onChangeText={updateField('date')}
                            style={styles.date}
                        />
                        <InputWithIcon
                            field="hours"
                            value={transcription.hours || ''}
                            onChangeText={updateField('hours')}
                            style={styles.hours}
                        />
                        <InputWithIcon
                            field="details"
                            value={transcription.details || ''}
                            onChangeText={updateField('details')}
                            style={styles.details}
                            multiline={true}
                        />
                    </View>
                </Card>
                <Text style={styles.subheader}>Review your new invoice note for accuracy, then press save</Text>
                <TouchableOpacity 
                    style={styles.saveButton} 
                    onPress={() => {
                        setTranscription(tempTranscription);
                        submitAllFields(tempTranscription);
                    }}
                >
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        );
    };

    const styles = StyleSheet.create({
        scrollViewContent: {
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 20,
        },
        cardContainer: {
            width: '90%',
            height: 400,
            padding: 20,
            borderRadius: 20,
            backgroundColor: '#d6e3b3',
            marginTop: 50,
        },
        redoButton: {
            position: 'absolute',
            top: 60,
            left: 5,
            borderWidth: 0.5,
            borderColor: '#768a48',
            borderStyle: 'solid',
            borderRadius: 40,
            width: 70,
            height: 45,
            justifyContent: 'center',
            alignItems: 'center',
        },
        redoButtonText: {
            color: '#47522b',
            fontFamily: 'SuisseScreen',
            fontSize: 14,
        },
        client: {
            fontFamily: 'SuisseWorks-Bold',
            fontSize: 25,
            marginTop: 20,
        },
        innerItems: {
            justifyContent: 'center',
            marginTop: 50,
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
        },
        input: {
            fontFamily: 'SuisseScreen',
            fontSize: 15,
            backgroundColor: '#e9efd6',
            borderRadius: 5,
            padding: 10,
            marginRight: 10,
        },
        pencilIcon: {
            marginLeft: 5,
        },
        hours: {
            minHeight: 40,
            width: 50,
        },
        date: {
            minHeight: 40,
            width: 125,
        },
        details: {
            minHeight: 120,
            width: '90%',
        },
        subheader: {
            fontFamily: 'SuisseWorks',
            fontSize: 18,
            lineHeight: 22,
            maxWidth: 300,
            textAlign: 'center',
            color: '#9ca683',
            padding: 10,
            marginTop: 20,
            marginBottom: 40,
        },
        saveButton: {
            position: 'absolute',
            bottom: 60,
            backgroundColor: '#535f36',
            padding: 15,
            borderRadius: 5,
            alignItems: 'center',
            marginTop: 20,
            width: '100%',
        },
        saveButtonText: {
            fontFamily: 'SuisseScreen-Bold',
            fontSize: 15,
            color: '#FFFFFF',
        },
    });

    export default TranscriptionUI;