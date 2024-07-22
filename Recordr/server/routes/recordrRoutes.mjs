import express from 'express';
import { 
    generateRecordrNote 
} from '../controllers/recordrController.mjs';

const router = express.Router();

router.post('/generateRecordrNote', generateRecordrNote);

export default router;