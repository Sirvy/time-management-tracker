import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

const allUsers = async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find();
    res.json(users);
};

export { allUsers };