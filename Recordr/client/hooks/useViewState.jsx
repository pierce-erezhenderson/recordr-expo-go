import { useState } from 'react';

export const InvoiceViewState = {
    LOADING: 'loading',
    SUCCESS: 'success',
    UPDATED_INVOICE: 'updatedInvoice',
    ALL_INVOICES: 'allInvoices',
    CLIENT_INVOICES: 'clientInvoices',
    SINGLE_INVOICE: 'singleInvoice',
    DEFAULT: 'default'
};

export const useViewState = () => {
    const [currentView, setCurrentView] = useState(ViewState.ALL_INVOICES);
    const [viewData, setViewData] = useState({});
  
    const setView = (view, data = {}) => {
      setCurrentView(view);
      setViewData(data);
    };
  
    return {
      currentView,
      viewData,
      setView,
    };
};
