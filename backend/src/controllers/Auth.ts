import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Register a new user
const register = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Bad Request: username, email, and password are required.' });
    }

    try {    
        let user = await User.findOne({ username });
        if (user) {
            return res.status(409).json({ message: 'User already exists.' });
        }
        
        user = new User({ username, email, password });
        await user.save();
        res.json({ message: 'Registration successful' });
    } catch (error) {
        next(error);
    }
};

// Login with an existing user
const login = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    try {
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY as string, {
            expiresIn: '1 hour'
        });
        res.json({ token });
    } catch (error) {
        next(error);
    }
};

export { register, login };