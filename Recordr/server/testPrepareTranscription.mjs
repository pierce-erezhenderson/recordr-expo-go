import { prepareTranscription } from './utils/itemUtils.mjs'
import { getAllClients } from './utils/clientUtils.mjs';

const manualTestForPrepareTranscription = async () => {
    const transcription = {
        "clientName": "WIFEYY",
        "date": "2024-10-23", 
        "hours": "3.25", 
        "details": "Installed new light fixtures in living room and hallway", 
        "invoice": "" 
    }
    const clientList = await getAllClients();

    const testResults = prepareTranscription(transcription, clientList)

    return testResults
}

manualTestForPrepareTranscription()
    .then(result => console.log('Test completed successfully:', result))
    .catch(error => console.error('Test failed:', error))