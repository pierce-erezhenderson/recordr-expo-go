import { prepareTranscription } from './utils/itemUtils.mjs'
import { getAllClientsInternal } from './utils/clientUtils.mjs';

const manualTestForPrepareTranscription = async () => {
    console.log('Loading transcription')
    const transcription = {
        "clientName": "WIFE",
        "date": "2024-10-23", 
        "hours": "3.25", 
        "details": "Installed new light fixtures in living room and hallway", 
        "invoice": "" 
    }
    console.log('Loading clientList, executing getAllClients')
    // const clientList = await getAllClientsInternal(transcription.clientName);

    const clientData = async () => {
        console.log('Beginning api call')
        const response = await fetch(`http://localhost:3000/api/client`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    
        if (!response.ok) {
            throw new Error(`Failed to fetch client: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Received client data:', data);
        console.log('Type of received data:', typeof data);
        console.log('Is data an array?', Array.isArray(data));
        return data;
    }

    const testResults = async () => {
        try {
            const clientList = await clientData();
            console.log('Received client list:', clientList);
            if (!Array.isArray(clientList)) {
                throw new Error('clientList is not an array');
            }
            return prepareTranscription(transcription, clientList);
        } catch (error) {
            console.error('Error in testResults:', error);
            throw error;
        }
    };

    const results = await testResults();
    return results;
}

manualTestForPrepareTranscription()
    .then(result => console.log('Test completed successfully:', result))
    .catch(error => console.error('Test failed:', error))