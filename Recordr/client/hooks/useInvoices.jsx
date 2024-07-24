import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { fetchInvoices } from '../services/invoiceService'; // add this
import { Text } from 'react-native';
import useLoading from '../hooks/useLoading';


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
  
    const renderItem = ({ item }) => (
      <View style={styles.row}>
        <Text>{item.date}</Text>
        <Text>{item.amount}</Text>
        <Text>{item.description}</Text>
      </View>
    );

    const renderList = ({ invoices, clients }) => (
        <SectionList
            style={styles.container}
            sections={invoices}
            renderItem={({ item }) => (
                <View style={styles.row}>
                    <Text style={styles.date}>{item.date}</Text>
                    <Text style={styles.hours}>{item.hours} hours</Text>
                    <Text style={styles.details}>{item.details}</Text>
                </View>
            )}
            renderSectionHeader={({ section }) => (
                <Text style={styles.header}>{section.title}</Text>
            )}
            keyExtractor={(item) => item.id}
            onRefresh={onRefresh}
            refreshing={loading}
        />
    );

    const renderInvoiceListTitle = ({ invoices, clients }) => (
        <View>
            <ClientIcon style={styles.clientIcon}/>
            <Text style={styles.invoiceListTitle}>{section.title}</Text>
            <EllipseIcon style={styles.ellipseIcon}/>
        </View>
    );

    const renderInvoiceListItems = ({ invoices, clients }) => (
        <FlatList
            style={styles.InvoiceListItems}
            renderItem={({ item }) => (
                <View style={styles.InvoiceListItemsRow}>
                    <Text style={styles.InvoiceListItemsNumber}>{invoiceNumber}</Text>
                    <Text style={styles.InvoiceListItemsClient}>{invoiceEntries} entries totalling {hoursTotal} hrs</Text> 
                    {/* make these variables */}

                </View>
            )}
            )
        }
            // edit/add params for FlatList
        />
    );

  
    return (
        loadInvoices,
        invoices,
        loading,
        renderItem,
        renderList,
        // renderSectionHeader,
        getAllInvoices, 
        setGetAllInvoices,
        getUpdatedInvoice, 
        setUpdatedInvoice,
        getClientInvoices, 
        setGetClientInvoices,
        getInvoice, 
        setGetInvoice
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