import express from 'express';
import { 
    registerUser, 
    loginUser 
} from '../controllers/userController.mjs';

const router = express.Router();

router.post('/user/register', registerUser);
router.post('/user/login', loginUser);

// Temporary route to create a user
router.post('/create-temp-user', async (req, res) => {
    try {
        const tempUser = new User({
            email: 'temp@example.com',
            password: 'password123'
        });
        await tempUser.save();
        res.json({ message: 'Temporary user created', user: tempUser });
    } catch (error) {
        console.error('Error creating temp user:', error);
        res.status(500).json({ message: 'Error creating temporary user' });
    }
});

export default router;