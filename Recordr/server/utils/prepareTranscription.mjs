import { createNewInvoiceInternal} from './invoiceUtils.mjs';
import { getLatestClientInvoiceInternal } from './clientUtils.mjs'
import connectDB from '../config/database.mjs';
import Client from '../models/client.mjs';
import Invoice from '../models/invoice.mjs'
import { createNewInvoiceWithNumber } from '../controllers/invoiceController.mjs';


// Could this logic be further decomposed for growth/scale?

export const prepareTranscription = async (transcription, clientList) => {
    // Prepare OpenAI transcription for front end

    await connectDB();

    try {
        const { clientName, newInvoice } = transcription;
        let { invoiceNumber } = transcription;
    
        console.log('clientName:', clientName, 'clientList:', clientList);

        const isClientMatch = findClientNameInList(clientName, clientList);
        const invoiceStatus = await checkInvoice(invoiceNumber, newInvoice);

        console.log('About to call getClientData, invoiceStatus:', invoiceStatus)
        const clientData = await getClientData(invoiceStatus, clientName, invoiceNumber, clientList, isClientMatch)

        return { transcription, invoiceData: clientData };

    } catch (error) {
        console.error('Unable to prepare Transcription:', error.message);
        throw error;
    }
};

const findClientNameInList = (nameToFind, clientList) => {
    const nameSet = new Set(clientList.map(client => client.clientName)); 
    return nameSet.has(nameToFind)
}

const checkInvoice = async (invoiceNumber, newInvoice) => {
    console.log('Checking invoices')

    if (newInvoice) {
        console.log('User requested new invoice')
        if (invoiceNumber) {
            console.log('User request new invoice and provided number')
            return { existingInvoice: false, newInvoice: true, invoiceNumber: invoiceNumber }
        }
        console.log("User didn't provide new invoiceNumber")
        return { existingInvoice: false, newInvoice: true, invoiceNumber: "0001" }
    } 
    const listedInvoice = await Invoice.findOne({ invoiceNumber })
    return {
        existingInvoice: !!listedInvoice,
        newInvoice: false
    };
};

const getClientData = async (invoiceStatus, clientName, invoiceNumber, clientList, isClientMatch) => {

    console.log('Beginning getClientData')
    console.log('invoiceStatus:', invoiceStatus)
    console.log('invoiceStatus.existingInvoice:', invoiceStatus.existingInvoice)
    if (isClientMatch) {
        const { latestInvoice, otherInvoices } = await getLatestClientInvoiceInternal(clientName);

        if (invoiceStatus.existingInvoice) {
            return createInvoiceData(clientName, invoiceNumber, otherInvoices, clientList, false, false);
        } else if (invoiceStatus.newInvoice) {
            return createInvoiceData(clientName, invoiceNumber, otherInvoices, clientList, false, true);
        } else {
            return createInvoiceData(clientName, latestInvoice.invoiceNumber, otherInvoices, clientList, false, true);
        }
    } else if (invoiceNumber) {
        return createInvoiceData(clientName, invoiceNumber, [], clientList, false, false);
    } else {
        return createInvoiceData(clientName, "0001", [], clientList, true, true);
    }
};

const createInvoiceData = (clientName, invoiceNumber, otherInvoices, clientList, newClient, newInvoice) => ({
    clientName,
    invoiceNumber,
    otherInvoices,
    clientList,
    newClient,
    newInvoice,
});