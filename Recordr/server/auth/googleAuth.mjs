import { JWT } from 'google-auth-library';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Adjust the path as needed
const keyFilePath = path.join(__dirname, '../thermal-beach-428703-h2-a68fe6ee7e17.json');

let client;

export const getAccessToken = async () => {
  try {
    if (!client) {
      const keys = JSON.parse(await fs.readFile(keyFilePath, 'utf8'));
      client = new JWT({
        email: keys.client_email,
        key: keys.private_key,
        scopes: ['https://www.googleapis.com/auth/cloud-platform'],
      });
    }

    const token = await client.getAccessToken();
    console.log('Access token obtained successfully');
    return token.token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
};