import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Category from '../models/Category';

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

    user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: 'Email already exists.' });
    }

    user = new User({ username, email, password });

    const defaultCategories = [
      {
        name: "Work",
        color: "#FF4C4C" // Strong Red for urgency and productivity
      },
      {
        name: "School",
        color: "#FF8C00" // Bright Orange for focus and active learning
      },
      {
        name: "Sleep",
        color: "#3498DB" // Calming Blue for restful activity
      },
      {
        name: "Exercise/Fitness",
        color: "#2ECC71" // Vibrant Green for energy and health
      },
      {
        name: "Food",
        color: "#8D6E63" // Warm Orange for nourishment and comfort
      },
      {
        name: "Personal development",
        color: "#16A085" // Deep Teal for serious growth and focus
      },
      {
        name: "Entertainment",
        color: "#FFD700" // Bright Yellow for light, easy-going activities
      },
      {
        name: "Free time",
        color: "#9B59B6" // Soft Purple for relaxation and socialization
      }
    ]

    await user.save();

    const categoryPromises = defaultCategories.map((category) => {
      return new Category({ name: category.name, color: category.color, userId: user._id }).save();
    });
    await Promise.all(categoryPromises);

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