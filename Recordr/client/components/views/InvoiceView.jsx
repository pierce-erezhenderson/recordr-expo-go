import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { RecordButton } from '../bobs/RecordButton';
import { GoToInvoicesButton } from '../bobs/GoToInvoicesButton';
import { UpdatedInvoiceList } from '../bobs/UpdatedInvoiceList';
import { RenderInvoiceTotal } from '../bobs/RenderInvoiceTotal';

const InvoiceView = ({ invoiceNumber, client, updatedInvoice, getClientInvoices, clients }) => {

    // add functionality to show updated invoice

    return (
        <View style={styles.updatedInvoice}>
            <RecordButton />
            <GoToInvoicesButton />
            <Text style={styles.smallUpperSubheading}>{invoiceNumber}</Text>
            <Text style={styles.largeHeader}>{client}</Text>
            <FlatList
                style={styles.InvoiceListItems}
                renderItem={({ item }) => (
                    <View style={styles.InvoiceListItemsRow}>
                        <CalendarIcon date={date} />
                        <Text style={styles.InvoiceListItemsDetails}>{invoices.details}</Text> 
                        <Text style={styles.InvoiceListItemsDetails}>{invoices.hours}</Text> 
                        <TouchableOpacity style={style.editInvoicePencil} onPress={handleEditInvoice}>
                            <PencilIcon />
                        </TouchableOpacity>
                    </View>
                )}
            />
            <RenderTotalFooter />
            <TouchableOpacity style={styles.goToClient} onPress={getClientInvoices(clients)}>
                <Text style={goToClientText}>Go to {clients}'s invoices</Text>
            </TouchableOpacity>
        </View>
    )
};

export default InvoiceView;