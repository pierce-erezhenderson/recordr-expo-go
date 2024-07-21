import { getAccessToken as fetchGoogleAccessToken } from '../auth/googleAuth.mjs';

export const getGoogleAccessToken = async (req, res) => {
  try {
    const accessToken = await fetchGoogleAccessToken();
    res.json({ accessToken });
  } catch (error) {
    console.error('Error getting access token:', error);
    res.status(500).json({ error: 'Failed to get access token' });
  }
};

