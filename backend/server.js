import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import router from './routes/index.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to handle CORS (add allowed origins if necessary)
app.use(cors({
  origin: [process.env.ALLOWED_ORIGIN],
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

// Middleware to parse JSON and request body
app.use(express.json());
app.use(bodyParser.json());

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define port
const PORT = process.env.PORT || 5000;



// Route for root (testing if server works)
app.get("/", (req, res) => {
  res.send("hello hrdik");
  });

// API routes
app.use('/api', router);

// Connect to MongoDB using MONGO_URI from environment variables
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to the database successfully');

    // Start the server after successful DB connection
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Database connection error:', err);
  });
