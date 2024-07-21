import express from 'express';
import { 
    registerUser, 
    loginUser 
} from '../controllers/userController.mjs';

const router = express.Router();

router.get('/user', registerUser);
router.get('/user', loginUser);

export default router;