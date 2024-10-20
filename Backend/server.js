import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: true,
    optionsSuccessStatus: 200,
    credentials:true
}

app.use(cors(corsOptions))

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.protocol}://${req.headers.host}${req.url}`);
  next();
});

app.use('/api/users', userRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});