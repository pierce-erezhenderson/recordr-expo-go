import { prepareTranscription } from './utils/prepareTranscription.mjs'
import { getAllClientsInternal } from './utils/clientUtils.mjs';

const testSaveItem = async () => {
    const invoiceData = {
        clientName: 'Andy',
        invoiceNumber: '5001',
    };
    const itemData = {
        date: '2024-10-23',
        hours: '3.25',
        details: 'Installed new light fixtures in living room and hallway'
    }

    const testResults = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/item`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    invoiceData,
                    itemData
                })
            });
        
            if (!response.ok) {
                throw new Error(`Failed to post saved item: ${response.status} ${response.statusText}`);
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error in testResults:', error);
            throw error;
        }
    };

    const results = await testResults();
    return results;
}

testSaveItem()
    .then(result => console.log('Test completed successfully:', result))
    .catch(error => console.error('Test failed:', error))