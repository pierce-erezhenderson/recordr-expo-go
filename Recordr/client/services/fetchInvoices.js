const API_BASE_URL = 'http://your-api-base-url.com/api'; // Replace with your actual API base URL


// ----- Fetch the updated invoice (via Recordr) -----

export const fetchUpdatedInvoice = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/invoices`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // should I auth these calls?
      },
      body: JSON.stringify({
        items: _id   // check this
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const invoices = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching updated invoice:', error);
    throw error;
  }
};


// ----- Fetch all user's invoices -----

export const fetchAllInvoices = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/invoices`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // should I auth these calls?
      },
      body: JSON.stringify({
        user: _id
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


// ----- Fetch specific client invoices for user -----

export const fetchClientInvoices = async (client) => {
  try {
    const response = await fetch(`${API_BASE_URL}/invoices`, {
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
