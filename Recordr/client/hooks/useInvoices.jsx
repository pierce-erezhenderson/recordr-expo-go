import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { fetchInvoices } from '../services/invoiceService'; // add this
import { Text } from 'react-native';
import useLoading from '../utils/LoadingContext'
import TagsCollection from '../components/bobs/TagsCollection';
import { fetchClientInvoices } from '../services/invoicesAPI';
import { Card, Title } from 'react-native-paper';
import { PencilIcon } from 'lucide-react';
import { API_URL } from './apiServer'
import { setLoading } from '../utils/LoadingContext'
import { transcription } from '../hooks/useRecordr'
import { invoices, clients } from '../hooks/useRecordr'


const useInvoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [clients, setClients] = useState([]);
    const { loading, setLoading } = useLoading();

    // States to render UIs
    const [getAllInvoices, setGetAllInvoices] = useState();
    const [getUpdatedInvoice, setUpdatedInvoice] = useState();
    const [getClientInvoices, setGetClientInvoices] = useState();
    const [getInvoice, setGetInvoice] = useState();


    
    useEffect(() => {
      loadInvoices();
    }, []);



    // ----- Get -----

    const fetchUpdatedInvoice = async () => {
    try {
        const response = await fetch(`${ API_URL }/invoices/:id`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // should I auth these calls?
        },
        body: JSON.stringify({
            items: invoices   // check this
        })
        });

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching updated invoice:', error);
        throw error;
    }
    };

    const fetchAllInvoices = async (invoices) => {
    try {
        const response = await fetch(`${ API_URL }/invoices`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // should I auth these calls?
        },
        body: JSON.stringify({
            user: invoices
        })
        });

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user invoices:', error);
        throw error;
    }
    };

    const fetchClientInvoices = async (client) => {
        try {
            const response = await fetch(`${ API_URL }/invoices/client`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // should I auth these calls?
                },
                body: ({
                    clientName: client
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching specific client invoices:', error);
            throw error;
        }
    };


    // ----- Update -----

    const createNewRecordr = async () => {
    setLoading(true);
    setError(null);

    try {
        const response = await fetch(`${ API_URL }/invoices`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ transcription })
        });

        if (!response.ok) {
            throw new Error('Failed to save note');
        }

        const data = await response.json();

        const checkInvoiceExists = async (data) => {
            if(!InvoiceNumber) {
                try {
                    const newInvoiceNumber = await createNewInvoice();
                    const { invoiceNumber } = newInvoiceNumber
                    return { invoiceNumber };
                } catch (error) {
                    console.error('Error creating new invoice for Recordr Note', error);
                    setError(error.message);
                }
            }
        }

        setSuccess(true);
        return data;
    } catch (error) {
        console.error('Error saving note:', error);
        setError(error.message);
    } finally {
        setLoading(false);
    }
    };

    const createNewInvoice = async (invoiceData) => {
    setLoading(true);
    setError(null);

    try {
        const response = await fetch(`${ API_URL }/invoices`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            invoiceNumber: invoiceData.invoiceNumber,
            clientName: invoiceData.clientName,
            totalAmount: invoiceData.totalAmount,
            rate: invoiceData.rate,
            items: invoiceData.items,
            })
        });

        if (!response.ok) {
        throw new Error('Failed to save invoice');
        }

        const data = await response.json();
        console.log('Invoice created:', data);
        setLoading(false);
        // setSuccess(true); -- later
        return data;
    } catch (error) {
        setError(error.message);
        setLoading(false);
        throw error;
    }
    };


    return {
        
        // Hooks for invoices
        loadInvoices,
        invoices,
        setInvoices,
        clients,
        setClients,
        loading,
        getAllInvoices, 
        setGetAllInvoices,
        getUpdatedInvoice, 
        setUpdatedInvoice,
        getClientInvoices, 
        setGetClientInvoices,
        getInvoice, 
        setGetInvoice,

        // Functions for rendering invoice lists
        handleEditInvoice,
        handleViewAll,
        handleBrowseInvoices,

        // API calls
        fetchClientInvoices,

        RenderTotalFooter,
        RenderClientInvoicesList
    }
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