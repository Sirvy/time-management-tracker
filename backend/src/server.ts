import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors())

mongoose.connect('mongodb://mongo:27017/mydatabase').then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.get('/test', (req, res) => {
    res.json({ message: 'This is a test endpoint!' });
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});