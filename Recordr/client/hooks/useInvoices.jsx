import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { fetchInvoices } from '../services/invoiceService'; // add this
import { Text } from 'react-native';
import useLoading from '../hooks/useLoading';
import TagsCollection from '../components/bobs/TagsCollection';
import { fetchClientInvoices } from '../services/fetchInvoices';
import { Card, Title } from 'react-native-paper';
import { PencilIcon } from 'lucide-react';


const useInvoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [clients, getClients] = useState();
    const { loading, setLoading } = useLoading();

    // States to render UIs
    const [getAllInvoices, setGetAllInvoices] = useState();
    const [getUpdatedInvoice, setUpdatedInvoice] = useState();
    const [getClientInvoices, setGetClientInvoices] = useState();
    const [getInvoice, setGetInvoice] = useState();

    const loadInvoices = async () => {
      setLoading(true);
      try {
        const data = await fetchInvoices();
        setInvoices(data);
      } catch (error) {
        console.error('Failed to fetch invoices:', error);
        // Handle error (e.g., show an alert)
      } finally {
        setLoading(false);
      }
    };
    
    useEffect(() => {
      loadInvoices();
    }, []);

    handleEditInvoice = () => {
        // API call to fetch invoice
    };

    handleViewAll = () => {
        // API call to fetch client invoices
    };


    // ----- General render components -----

    const RenderTotalFooter = () => {
        <View style={styles.RenderTotalFooter}>
            <MoneyBagIcon style={styles.moneyBagIcon}/>
            <Text styles={styles.TotalText}>Total</Text>
            <Text styles={styles.currency}>{invoiceCurrency}</Text>
            {/* line break */}
            <Text styles={styles.hoursTotal}>{hoursTotal}</Text>
        </View>
    }


    // ----- Functions for Invoice List UI -----

    const RenderInvoice = () => {
        <View>
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
        </View>
    }


    // ----- Functions for main Invoice screen UI -----

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
                <RenderInvoiceListTitle /> 
                {/* // Maybe change the above into Title from paper */}
                <RenderInvoiceListItems />
                <RenderInvoiceListFooter />
            </Card.Content>
        </Card>
    }


    // ----- Functions for specific client invoices UI ----- 
    
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
        
        // Hooks for invoices
        loadInvoices,
        invoices,
        loading,
        getAllInvoices, 
        setGetAllInvoices,
        getUpdatedInvoice, 
        setUpdatedInvoice,
        getClientInvoices, 
        setGetClientInvoices,
        getInvoice, 
        setGetInvoice,

        // UI for rendering invoice lists
        InvoiceList,
        RenderInvoice,
        ClientInvoiceList,
        RenderInvoiceListFooter,
    );
};
  
const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    row: {
        padding: 15,
        marginBottom: 5,
        backgroundColor: 'skyblue',
    },
    header: {
        padding: 15,
        marginBottom: 5,
        backgroundColor: 'steelblue',
        color: 'white',
        fontWeight: 'bold',
    },
});

export default useInvoices;



    // const renderItem = ({ item }) => (
    //   <View style={styles.row}>
    //     <Text>{item.date}</Text>
    //     <Text>{item.amount}</Text>
    //     <Text>{item.description}</Text>
    //   </View>
    // );

    // const renderList = ({ invoices, clients }) => (
    //     <SectionList
    //         style={styles.container}
    //         sections={invoices}
    //         renderItem={({ item }) => (
    //             <View style={styles.row}>
    //                 <Text style={styles.date}>{item.date}</Text>
    //                 <Text style={styles.hours}>{item.hours} hours</Text>
    //                 <Text style={styles.details}>{item.details}</Text>
    //             </View>
    //         )}
    //         renderSectionHeader={({ section }) => (
    //             <Text style={styles.header}>{section.title}</Text>
    //         )}
    //         keyExtractor={(item) => item.id}
    //         onRefresh={onRefresh}
    //         refreshing={loading}
    //     />
    // );