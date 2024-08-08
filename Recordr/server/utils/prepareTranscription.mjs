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
        return {
            existingInvoice: false,
            isNewInvoice: true,
        };
    } else if (invoiceNumber) {
        const listedInvoice = await Invoice.findOne({ invoiceNumber })
        
        return {
            existingInvoice: !!listedInvoice,
            isNewInvoice: !listedInvoice,
        };
    } else {
        return { 
            existingInvoice: false,
            isNewInvoice: false,
        }
    }
};

const getClientData = async (invoiceStatus, clientName, invoiceNumber, clientList, isClientMatch) => {
    if (isClientMatch) {
        const { latestInvoice, otherInvoices } = await getLatestClientInvoiceInternal(clientName);

        if (invoiceStatus.existingInvoice) {
            // Mentioned client exists, invoice exists -- FUNCTIONAL
            return createInvoiceData(clientName, invoiceNumber, otherInvoices, clientList, false, false);
        } else if (invoiceStatus.isNewInvoice) {
            // Mentioned client exists, mentioned new invoiceNumber || requested new invoice -- FUNCTIONAL
            return createInvoiceData(clientName, invoiceNumber || "0001", otherInvoices, clientList, false, true);
        } else {
            // Mentioned client exists, didn't mention anything about invoice
            return createInvoiceData(clientName, latestInvoice.invoiceNumber, otherInvoices, clientList, false, false);
        }
    } else if (invoiceNumber) {
            // Mentioned client doesn't exist, mentioned an invoiceNumber
        return createInvoiceData(clientName, invoiceNumber, [], clientList, false, false);
    } else {
            // Mentioned client doesn't exist, didn't mention anything about invoice
        return createInvoiceData(clientName, "0001", [], clientList, true, true);
    }
};

const createInvoiceData = (clientName, invoiceNumber, otherInvoices, clientList, isNewClient, isNewInvoice) => ({
    clientName,
    invoiceNumber,
    otherInvoices,
    clientList,
    isNewClient,
    isNewInvoice,
});




// const invoiceExists = otherInvoices.some(invoice => invoice.invoiceNumber === invoiceNumber);
// const invoiceStatus = {
//     existingInvoice: invoiceExists,
//     newInvoiceNumber: !invoiceExists && invoiceNumber !== latestInvoice.invoiceNumber
// }
// const requestedInvoiceNumber = invoiceStatus.existingInvoice || invoiceStatus.newInvoiceNumber
//     ? invoiceNumber
//     : latestInvoice.invoiceNumber;