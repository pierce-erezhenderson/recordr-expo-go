import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { RecordButton } from '../bobs/RecordButton';
import { CarrotButton } from '../bobs/CarrotButton';
import { ViewAllButton } from '../bobs/ViewAllButton';
import { ClientIcon } from '../icons/ClientIcon';
import { EllipseIcon } from '../icons/EllipseIcon';
import { PencilIcon } from '../icons/PencilIcon';
import { TagsCollection } from '../bobs/TagsCollection';
import { Card } from 'react-native-paper';
import { fetchClientInvoices } from '../services/invoicesAPI';



const AllInvoicesView = () => {

    const RenderAllInvoicesTitle = ({ invoices, clients }) => (
        <View>
            <ClientIcon style={styles.clientIcon}/>
            <Text style={styles.invoiceListTitle}>{section.title}</Text>
            <EllipseIcon style={styles.ellipseIcon}/>
        </View>
    );

    const RenderAllInvoicesItems = ({ invoices, clients }) => {
        <FlatList
            style={styles.InvoiceListItems}
            renderItem={({ item }) => (
                <View style={styles.InvoiceListItemsRow}>
                    <Text style={styles.InvoiceListItemsNumber}>{invoiceNumber}</Text>
                    <Text style={styles.InvoiceListItemsClient}>{invoiceEntries} entries totalling {hoursTotal} hrs</Text> 
                    {/* make these variables */}
                    <TagsCollection style={styles.TagsCollection} />
                    <TouchableOpacity style={style.editInvoicePencil} onPress={handleEditInvoice}>
                        <PencilIcon />
                    </TouchableOpacity>
                </View>
            )}
            // edit/add params for FlatList
        />
    };

    const RenderAllInvoicesFooter = ({ invoices }) => {
        <View style={styles.renderInvoiceListFooter}>
            <Text style={styles.InvoiceListTotal}>{TotalCurrency}</Text>
            <ViewAllButton style={styles.ViewAllButton} onPress={fetchClientInvoices} />
        </View>
    }

    const RenderAllInvoices = ({ invoices, clients }) => {
        <Card style={styles.renderInvoiceList}>
            <Card.Content>
                <RenderAllInvoicesTitle /> 
                {/* // Maybe change the above into Title from paper */}
                <RenderAllInvoicesItems />
                <RenderAllInvoicesFooter />
            </Card.Content>
        </Card>
    }

    return (
        <View>
            <RecordButton />
            <Text style={styles.largeHeader}>Invoices</Text>
            <CarrotButton /> 
            <Flatlist 
                data={invoiceList} // ADD API CALL
                renderItem={({ item }) => <RenderAllInvoices invoices={item.invoices} clients={item.clients} />}
                keyExtractor={item => item.id}
            />
        </View>
    )

};

export default AllInvoicesView;