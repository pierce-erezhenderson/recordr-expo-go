import { createNewInvoice } from '../controllers/invoiceController.mjs';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

const mockSetLoading = jest.fn();
const mockSetError = jest.fn();
jest.mock('../hooks/useInvoices', () => ({
    ...jest.requireActual('../hooks/useInvoices'),
    setLoading: mockSetLoading,
    setError, mockSetError,
}));

describe('createNewInvoice', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
        mockSetLoading.mockClear();
        mockSetError.mockClear();
    });

    it('should create a new invoice successfully', async () => {
        const newInvoice = {
            invoiceNumber: "INV-001",
            clientName: "John Doe",
            totalAmount: 1000,
            rate: 50,
            items: ["60d5ecb54b24a169f0394e68"]
        }
    })
})