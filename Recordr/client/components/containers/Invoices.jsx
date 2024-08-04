import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import useInvoices from '../hooks/useInvoices.jsx';
import InvoiceView from '../views/InvoiceView.jsx';
import AllInvoicesView from '../views/AllInvoicesView.jsx';
import ClientInvoicesView from '../views/ClientInvoicesView.jsx';
import StarterView from '../views/StarterView.jsx';
import { handleUpsertItem } from '../../../server/controllers/itemsController.mjs';

const Invoices = () => {
  const {
    updatedInvoice,
    getAllInvoices,
    getClientInvoices,
    setInvoices,
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


  // ------ Invoice data functionality ------

  handleAllClients = () => {
      // API call to fetch client invoices // handleViewAll
  };

  handleAllInvoicesForClient = () => {
      // API call to fetch invoices for particular client
  }


  // ------ Save button functionality ------

  handleNewItemCreateClientApi = () => {
      //Save item and create client and invoice
  }
  
  handleNewItemCreateInvoiceApi = () => {
    //Save item with existing client and create invoice
  }

  handleUpsertItem = () => {
    // Save item with existing client and invoice
  }


  // *** LATER ***
  
  handleAllInvoiceItems = () => {
    // API call to fetch invoice
  };

  handleInvoiceData = () => {
    // sum/currency/hours
    // clientName
    // InvoiceNumber
  }



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
      case updatedInvoice: 
        return (
          <InvoiceView 

          />
        );

      // ----- UI for Invoice main screen -----
      case getAllInvoices: 
        return (
          <AllInvoicesView 
          
          />
        );

      // ----- UI for all invoices of specific client -----
      case getClientInvoices: 
        return (
          <ClientInvoicesView 
          
          />
        );
      default: return <StarterView />;
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