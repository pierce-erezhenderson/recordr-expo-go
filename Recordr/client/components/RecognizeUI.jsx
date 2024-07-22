import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { G, Path, Polygon } from 'react-native-svg';
import ImageCycler from './ImageCycler';
import RecordingSignal from './RecordingSignal';

const RecognizeUI = ({recognize, handleSetLoading, handleRedo}) => (
    <View style={styles.recognizeContainer}>
        <TouchableOpacity onPress={handleRedo} style={styles.redoButton}>
            <Text style={styles.redoButtonText}>Redo</Text>
        </TouchableOpacity>
        <View style={styles.recordingSignal} >
            <RecordingSignal />
        </View>
        <Text style={styles.header}>We're live!</Text>
        <View style={styles.imageCyclerContainer} >
            <ImageCycler 
                recognize={recognize} 
            />
        </View>
        <View style={styles.instructionContainer} >
            <Text style={styles.instructionText}>Mention the date, client, billable hours,{'\n'}and any relevant details</Text>
        </View>
        <View style={styles.doneButtonContainer}>
            <TouchableOpacity
                style={styles.doneButton}
                activeOpacity={0.4}
                onPress={handleSetLoading}
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

const styles = StyleSheet.create({
    recognizeContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    redoButton: {
        position: 'absolute',
        top: 60,
        left: 5,
        right: 0,
        bottom: 0,
        borderWidth: 0.5,
        borderColor: '#e0c3b3',
        borderStyles: 'solid',
        borderRadius: 40,
        width: 70,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    redoButtonText: {
        color: '#71645d',
        fontFamily: 'SuisseScreen',
        fontSize: 14,
    },
    recordingSignal: {
        position: 'absolute',
        top: 60,
        left: 175,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontFamily: 'SuisseWorks-Bold',
        fontSize: 35,
        lineHeight: 35,
        textAlign: 'center',
        color: '#38332f',
        padding: 5,
        marginTop: 100, // drops the header down a bit
    },
    imageCyclerContainer: {
        marginTop: 20,
    },
    instructionText: {
        fontFamily: 'SuisseScreen-Regular',
        fontSize: 18,
        lineHeight: 25,
        color: '#908581',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 50,
    },
    doneButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    doneButton: {
        backgroundColor: '#c75935',
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
});

export default RecognizeUI;