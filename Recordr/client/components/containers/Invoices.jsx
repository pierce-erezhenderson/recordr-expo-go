import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import useInvoices from '../hooks/useInvoices.jsx';
import InvoiceView from '../views/InvoiceView.jsx';

const InvoiceViewState = {
  LOADING: 'loading',
  SUCCESS: 'success',
  UPDATED_INVOICE: 'updatedInvoice',
  ALL_INVOICES: 'allInvoices',
  CLIENT_INVOICES: 'clientInvoices',
  SINGLE_INVOICE: 'singleInvoice',
  DEFAULT: 'default'
};

const Invoices = () => {
  const [currentInvoiceView, setCurrentInvoiceView] = useState(InvoiceViewState.LOADING);
  const {
    invoices,
    clients,
    updatedInvoice,
    getAllInvoices,
    getClientInvoices,
    getInvoice,
    setInvoices,
    setClients,
    setGetAllInvoices,
    setUpdatedInvoice,
    setGetClientInvoices
  } = useInvoices();

  useEffect(() => {
    // Determine the initial view state based on the data
    if (updatedInvoice) {
      setCurrentView(InvoiceViewState.UPDATED_INVOICE);
    } else if (getAllInvoices) {
      setCurrentView(InvoiceViewState.ALL_INVOICES);
    } else {
      setCurrentView(InvoiceViewState.DEFAULT);
    }
  }, [updatedInvoice, getAllInvoices]);

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

  handleEditInvoice = () => {
      // API call to fetch invoice
  };

  handleViewAll = () => {
      // API call to fetch client invoices
  };

  handleBrowseInvoices = () => {
      // API call to fetch invoices for particular client
  };


  // ----- UI for Invoices Output -----

  const getInvoiceUI = () => {
    switch (true) {
      case loading: 
      return (
          <View style={styles.loadingContainer}>
              <ImageCycler />
              <LoadingAnimation style={{marginBottom: 50}} />
          </View>
      );
      case success: return <SuccessAnimation />;


      // ----- UI for Recordr Output -----
      // ADD UPDATED STATE TO UPDATE ITEM

      case updatedInvoice: 
        return (
          <InvoiceView 

          />
        );

        
      // ----- UI for Invoice main screen -----

      case getAllInvoices: 
        return (
          <View style={styles.getAllInvoices}>

          </View>
        );


      // ----- UI for all invoices of specific client -----

      case getClientInvoices: 
        return (
          <View>
            <View style={getClientInvoices}>
              <ClientIcon />
              <Text style={styles.Header}>{client}</Text>
            </View>
            {/* <ListUI
              getClientInvoices={getClientInvoices}
              clients={clients}
              invoices={invoices}
            /> */}
          </View>
        );

      default: return (
        <View style={styles.catchAll}>
          <Text style={styles.header}>What's next?</Text>
          <RecordButton />
          <GoToInvoicesButton />
        </View>
      )
    }
  }
  
  return (
    <View style={styles.invoicesContainer}> 
      {getInvoiceUI()}
    </View>

  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'skyblue',
  },
  date: {
    fontWeight: 'bold',
  },
  hours: {
    fontStyle: 'italic',
  },
  details: {
    marginTop: 5,
  },
  header: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'steelblue',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Invoices;