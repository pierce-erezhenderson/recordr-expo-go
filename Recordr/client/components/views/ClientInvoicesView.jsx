import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { RecordButton } from '../bobs/RecordButton';
import { GoToInvoicesButton } from '../bobs/GoToInvoicesButton';
import { UpdatedInvoiceList } from '../bobs/UpdatedInvoiceList';
import { RenderInvoiceTotal } from '../bobs/RenderInvoiceTotal';



const ClientInvoicesView = ({ invoiceNumber, client, updatedInvoice, getClientInvoices, clients }) => { 
    const RenderClientInvoicesList = ({ invoices, clients }) => {
        <Card style={styles.renderClientInvoiceList}>
            <Card.Content>
                <Text style={invoiceNumberHeader}>{InvoiceNumber}</Text>
                <TagsCollection style={styles.TagsCollection} />
                <TouchableOpacity style={styles.editClientInvoiceButton} onPress={getInvoice(client)}>
                    <PencilIcon />
                    <Text styles={styles.editClientInvoiceButtonText}>Edit</Text>
                </TouchableOpacity>
                <Text styles={styles.seeEntriesTest}>See all {itemEntries} entries</Text>
                <RenderInvoiceListItems />
                <RenderInvoiceListFooter />
            </Card.Content>
        </Card>
    }


    return (
        <View style={getClientInvoices}>
            <ClientIcon />
            <Text style={styles.Header}>{client}</Text>
        </View>
        // <RenderClientInvoicesList />
    )
    
};

