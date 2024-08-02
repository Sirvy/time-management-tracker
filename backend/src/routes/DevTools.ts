import express from 'express';
import { allUsers } from '../controllers/DevTools';

const router = express.Router();

router.get('/users', allUsers);

export default router;