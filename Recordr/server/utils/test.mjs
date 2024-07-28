// ****** Testing the OPENAI function ******
// const output = JSON.stringify({ date: "YYYY-MM-DD", hours: "X.XX", client: "ClientName", details: "TaskDetails" });

// console.log("stringify output:", output);
// console.log("parse output:", JSON.parse(output));


// -------------------------------------------


// ****** Testing the check client util ******
import { checkForClient } from './invoiceUtils.mjs';

checkForClient('someClientId')
  .then(invoice => console.log('Invoice:', invoice))
  .catch(error => console.error('Error:', error));