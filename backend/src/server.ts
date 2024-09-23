import express from 'express';
import cors from 'cors';
import AuthRoutes from './routes/Auth';
import UserRoutes from './routes/User';
import DevToolsRoutes from './routes/DevTools';
import connectDB from './utils/db';
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.MONGODB_URI)

const app = express();
const port = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

app.use(cors())
app.use(express.json());

connectDB();

// authentication routes
app.use('/auth', AuthRoutes);

// user routes
app.use('/user', UserRoutes);

// DevTools
app.use('/devtools', DevToolsRoutes);


app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});


app.get('/test', (req, res) => {
    res.json({ message: 'This is a test endpoint!' });
});


app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
});