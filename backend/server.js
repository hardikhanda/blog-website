
import express from 'express';
import path from 'path'
const app = express();
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import router from './routes/index.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import http from 'http'



dotenv.config();
app.use(cors(
  {



  
    origin: 'https://pec-impulse-frontend.vercel.app',


      credentials: true
  }
));
app.use(express.json())

const PORT = process.env.PORT || 4000



//routes
app.get("/", (req, res) => {
  res.json("Hello");
})
app.use('/api', router)


mongoose.connect('mongodb+srv://hardikhandabt22cse:pBHDqJQRwCz0RSTm@cluster0.svmyngd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');


mongoose.connection.on('error',err=>{
  console.log('connection failed');
});

mongoose.connection.on('connected',()=>{
  console.log('connected successfully with database');
});

const server = http.createServer(app);
server.listen(PORT,()=>{console.log('this app is running on '+PORT)});
