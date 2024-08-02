import express, { Request, Response } from 'express';
import { authenticate } from '../middlewares/Auth';

const router = express.Router();

router.get('/profile', authenticate, (req: any, res: Response) => {
    res.json({ message: `Welcome ${req.user.username}` });
});

export default router;