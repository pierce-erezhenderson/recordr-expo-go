import { 
    Text, 
    TextInput, 
    View, 
    StyleSheet, 
    TouchableOpacity, 
    TouchableWithoutFeedback, 
    Keyboard,
} from 'react-native';
import { Card } from 'react-native-paper';

const TranscriptionUI = ({transcription, updateField, submitAllFields }) => (
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

const styles = StyleSheet.create({
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

export default TranscriptionUI;