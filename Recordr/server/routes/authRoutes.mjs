import express from 'express';
import { 
  getGoogleAccessToken
} from '../controllers/authController.mjs';

const router = express.Router();

router.get('/google-access-token', getGoogleAccessToken);

export default router;