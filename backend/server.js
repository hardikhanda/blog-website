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

// Initialize dotenv to load environment variables
dotenv.config();

// Create Express app
const app = express();

// Use CORS for handling cross-origin requests
app.use(cors({
  origin: [process.env.ALLOWED_ORIGIN],  // Use environment variable for allowed origins
  credentials: true
}));

// Middleware for JSON and body parsing
app.use(express.json());
app.use(bodyParser.json());

// Define the PORT to run the server
const PORT = process.env.PORT || 5000;

// Serve static files from the frontend build folder
app.get("/", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../frontend/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

// API routes
app.use('/api', router);

// MongoDB connection using environment variable for MongoDB URI
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// MongoDB connection error handling
mongoose.connection.on('error', err => {
  console.log('Connection to MongoDB failed:', err);
});

// MongoDB connection success handling
mongoose.connection.on('connected', () => {
  console.log('Connected successfully to MongoDB');
});

// Create an HTTP server
const server = http.createServer(app);

// Start the server and listen on the specified PORT
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
