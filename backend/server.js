import express from 'express';
const app = express();
import router from './routes/index.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
dotenv.config();
app.use(express.json())
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000

app.get("/", function (req,res){
  res.sendFile(
  path.join(__dirname,"../frontend/build/index.html"),
  function (err) {
    if (err) {
   res.status(500).send(err);
    }
  }
);
});

//routes
app.use('/api', router)


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(PORT, () => {
      console.log('listening for requests on port', PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 