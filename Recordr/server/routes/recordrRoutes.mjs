import express from 'express';
import { 
    createRecordrNote 
} from '../controllers/recordrController.mjs';

const router = express.Router();

router.post('/createRecordrNote', createRecordrNote);

export default router;