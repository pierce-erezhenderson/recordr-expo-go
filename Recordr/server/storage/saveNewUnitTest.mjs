

const manualTestForHandleUpsertItem = async () => {
    const invoiceId = '66af55e9f9386d13c07b0757';
    const itemData = { 
        "date": "2024-10-23", 
        "hours": "3.25", 
        "details": "Installed new light fixtures in living room and hallway", 
        "invoice": "" 
    };

    try {
        const invoiceData = await getInvoice(invoiceId);
        console.log('Fetched invoice:', invoiceData);

        const savedItem = await addItem(invoiceData, itemData);
        console.log('Saved item:', savedItem);

        return savedItem;
    } catch (error) {
        console.error("Error in manual test:", error.message)
        throw error;
    }
}

const manualTestForHandleNewItemCreateInvoice = async () => {
    const invoiceData = {
        "clientName": "WIFEYY", 
        "newInvoiceNumber": "2222"
    };
    const itemData = { 
        "date": "2024-11-05", 
        "hours": "0.75", 
        "details": "Consulted on paint color choices for bedroom remodel",
        "invoice": ""
    };

    try {

        const savedItem = await addItem(invoiceData, itemData);
        console.log('Saved item:', savedItem);

        return savedItem;
    } catch (error) {
        console.error("Error in manual test:", error.message)
        throw error;
    }
}


const manualTestForHandleNewItemCreateClient = async () => {
    const invoiceData = {
        "clientName": "U2.7", 
        "newInvoiceNumber": "0001"
    };
    const itemData = { 
        "date": "2024-11-05", 
        "hours": "0.75", 
        "details": "Consulted on paint color choices for bedroom remodel",
        "invoice": ""
    };

    try {

        const savedItem = await addItem(invoiceData, itemData);
        console.log('Saved item:', savedItem);

        return savedItem;
    } catch (error) {
        console.error("Error in manual test:", error.message)
        throw error;
    }
}

const getInvoice = async (invoiceId) => {
    const response = await fetch(`http://localhost:3000/api/invoice/${invoiceId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch invoice');
    }

    return response.json();
}

const addItem = async (invoiceData, itemData) => {
    const response = await fetch(`http://localhost:3000/api/item`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ invoiceData, itemData })
    });

    if (!response.ok) {
        throw new Error('Failed to save item');
    }

    return response.json();
};


manualTestForHandleUpsertItem()
    .then(result => console.log('Test completed successfully:', result))
    .catch(error => console.error('Test failed:', error));

// manualTestForHandleNewItemCreateInvoice()
//     .then(result => console.log('Test completed successfully:', result))
//     .catch(error => console.error('Test failed:', error));

// manualTestForHandleNewItemCreateClient()
//     .then(result => console.log('Test completed successfully:', result))
//     .catch(error => console.error('Test failed:', error));
