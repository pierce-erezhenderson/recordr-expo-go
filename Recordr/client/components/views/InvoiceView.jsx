import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { RecordButton } from '../bobs/RecordButton';
import { GoToInvoicesButton } from '../bobs/GoToInvoicesButton';
import { UpdatedInvoiceList } from '../bobs/UpdatedInvoiceList';
import { RenderInvoiceTotal } from '../bobs/RenderInvoiceTotal';

const InvoiceView = ({ invoiceNumber, client, updatedInvoice, getClientInvoices, clients }) => {

    return (
        <View style={styles.updatedInvoice}>
            <RecordButton />
            <GoToInvoicesButton />
            <Text style={styles.smallUpperSubheading}>{invoiceNumber}</Text>
            <Text style={styles.largeHeader}>{client}</Text>
            <UpdatedInvoiceList updatedInvoice={updatedInvoice} />
            <RenderInvoiceTotal />
            <TouchableOpacity style={styles.goToClient} onPress={getClientInvoices(clients)}>
                <Text style={goToClientText}>Go to {clients}'s invoices</Text>
            </TouchableOpacity>
        </View>
    )
};

export default InvoiceView;