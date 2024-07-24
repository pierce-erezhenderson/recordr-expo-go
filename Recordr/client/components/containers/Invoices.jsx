import InvoiceList from './path/to/InvoiceList';
import useInvoices from '../hooks/useInvoices.jsx';

const Invoices = () => {

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

  const GetInvoiceUI = () => {
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
          <View style={styles.updatedInvoice}>
            <RecordButton />
            <Text style={styles.smallUpperSubheading}>{invoiceNumber}</Text>
            <Text style={styles.largeHeader}>{client}</Text>
            <GoToInvoicesButton />
            <ListUI 
              updatedInvoice={updatedInvoice}
              invoices={invoices}
            />
          </View>
        );

        
      // ----- UI for Invoice main screen -----

      case getAllInvoices: 
        return (
          <View style={styles.getAllInvoices}>
            <RecordButton />
            <Text style={styles.largeHeader}>Invoices</Text>
            <GoToInvoicesButton />
            <ListUI 
              getAllInvoices={getAllInvoices}
              clients={clients}
              invoices={invoices}
            />
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
            <ListUI
              getClientInvoices={getClientInvoices}
              clients={clients}
              invoices={invoices}
            />
          </View>
        );
      
      
      // ----- UI for one invoice -----
      
      case getInvoice: 
        return (
          <View style={getInvoice}>
            <BrowseInvoicesMenu 
              clients={clients}
            />
            <View>
                <DocumentIcon />
                <Text style={styles.Header}>{invoiceNumber}</Text>
              </View>
            <ListUI 
              getInvoice={getInvoice}
              clients={clients}
              invoices={invoices}
            />
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

  )
};

export default Invoices;