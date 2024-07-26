import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 5000;

mongoose.connect('mongodb://mongo:27017/mydatabase').then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});