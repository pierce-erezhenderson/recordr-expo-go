import React from 'react';
import { SectionList, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import useInvoices from '../hooks/useInvoices';


const ListUI = ({ 
  loading, 
  onRefresh,
  updatedInvoice, 
  getAllInvoices,
  getClientInvoices,
  getInvoice,
  invoices,
  clients
}) => {

  const { 
    RenderLists,
    RenderItems
  } = useInvoices;

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  
  const RenderInvoices = () => {
    switch (true) {
      

      // ----- Lists for Recordr Output UI -----
      
      case updatedInvoice:
        return (
          <View>
            <RenderLists
              style={styles.updatedInvoice}

            />
          </View>
        );

      
      // ----- Lists for Invoice main screen UI -----
      
      case getAllInvoices:
        return (
          <View>

          </View>
        );

      
      // ----- Lists for all invoices of specific client UI ----- 

      case getClientInvoices:
        return (
          <View>

          </View>
        );

      
      // ----- List for one invoice UI -----

      case getInvoice:
        return (
          <View>

          </View>
        );
      return 

    }
  }


  return (

  );

  // add this
  return (
    <View style={styles.screen}>
      <InvoiceList 
        data={invoices}
        loading={loading}
        onRefresh={loadInvoices}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
    </View>
  );
}

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

export default ListUI;