import express from 'express';
import { BookRouter } from './routes/api/book.js';
import * as dotenv from 'dotenv';
dotenv.config();

//create a debug channel called app:Server
import debug from 'debug';
const debugServer = debug('app:Server');

const app = express();

//middleware
//allow from data
app.use(express.urlencoded({extended: true}));
app.use('/api/books', BookRouter);

//error handling middleware
app.use((req,res) => {
  res.status(404).json({error: `Sorry couldn't find ${req.originalUrl}`});
});

//handle server exceptions
app.use((err,req,res,next) => {
  debugServer(err.stack);
  res.status(500).json({error: err.stack});
});

//default route
app.get('/', (req,res) => {
  debugServer('Hello from the upgraded console.log()!');

  res.send(`Hello from Amazon.com!`);
});

const port = process.env.PORT || 3005;

//listen on port 3003
app.listen(port, (req,res) => {
  debugServer(`Server is listening on http://localhost:${port}`);
});