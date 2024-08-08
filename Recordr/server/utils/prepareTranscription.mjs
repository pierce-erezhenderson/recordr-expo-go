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
        const clientData = await getClientData(invoiceStatus, clientName, clientList, isClientMatch)
        console.log('transcription within createUpdatedTranscription:', transcription)
        const updatedTranscription = createUpdatedTranscription(transcription) // WORKING ON FINALIZING THIS -- PEEL OUT NECESSARY INFO


        return { invoiceData: clientData, itemData: updatedTranscription };

    } catch (error) {
        console.error('Unable to prepare transcription:', error.message);
        throw error;
    }
};

const isIntegerString = (invoiceNumber) =>  {
    console.log('Checking if invoiceNumber only has numbers')
    return /^\d+$/.test(invoiceNumber);
  }

const findClientNameInList = (nameToFind, clientList) => {
    const nameSet = new Set(clientList.map(client => client.clientName)); 
    return nameSet.has(nameToFind)
}

const checkInvoice = async (invoiceNumber) => {
    console.log('Checking invoices')

    if (!isIntegerString(invoiceNumber)) {
        return { 
            invoiceNumber: "",
            existingInvoice: false,
            isNewInvoice: true,
        };
    };

    if (invoiceNumber) {
        const listedInvoice = await Invoice.findOne({ invoiceNumber });

        return {
                invoiceNumber,
                existingInvoice: !!listedInvoice,
                isNewInvoice: !listedInvoice,
                newInvoice: !listedInvoice, // in case user erroneously calls existing invoiceNumber new
        };
    } else {
        return { 
            existingInvoice: false,
            isNewInvoice: false,
        };
    }
};

const getClientData = async (invoiceStatus, clientName, clientList, isClientMatch) => {
    console.log('invoiceNumber:', invoiceStatus.invoiceNumber)

    if (isClientMatch) {
        const { latestInvoice, otherInvoices } = await getLatestClientInvoiceInternal(clientName);

        if (invoiceStatus.existingInvoice) {
            // Mentioned client exists, invoice exists -- FUNCTIONAL
            return createInvoiceData(clientName, invoiceStatus.invoiceNumber, otherInvoices, clientList, false, false);
        } else if (invoiceStatus.isNewInvoice) {
            // Mentioned client exists, mentioned new invoiceNumber || requested new invoice -- FUNCTIONAL
            return createInvoiceData(clientName, invoiceStatus.invoiceNumber || "0001", otherInvoices, clientList, false, true);
        } else {
            // Mentioned client exists, didn't mention anything about invoice -- FUNCTIONAL
            return createInvoiceData(clientName, latestInvoice.invoiceNumber, otherInvoices, clientList, false, false);
        }
    } else if (invoiceStatus.invoiceNumber) {
            // Mentioned client doesn't exist, mentioned an invoiceNumber -- FUNCTIONAL
        return createInvoiceData(clientName, invoiceStatus.invoiceNumber, [], clientList, true, true);
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

const createUpdatedTranscription = (transcription) => ({
    date: transcription.date,
    hours: transcription.hours,
    details: transcription.details,
})



// disgustingly overbaked and unnecessarily complex, negative value add bad bad -- kötü
// const invoiceExists = otherInvoices.some(invoice => invoice.invoiceNumber === invoiceNumber);
// const invoiceStatus = {
//     existingInvoice: invoiceExists,
//     newInvoiceNumber: !invoiceExists && invoiceNumber !== latestInvoice.invoiceNumber
// }
// const requestedInvoiceNumber = invoiceStatus.existingInvoice || invoiceStatus.newInvoiceNumber
//     ? invoiceNumber
//     : latestInvoice.invoiceNumber;



// this probably shouldn't exist, because a user could both say there's a new invoice
// and mention an existing invoice in the same note, so not matter what we have to check
// (newInvoice) {
//     return {
//         invoiceNumber,
//         existingInvoice: false,
//         isNewInvoice: true,
//     }
// } else