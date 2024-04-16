const connectToMongo = require('./db.js');
const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000

// import express, { json } from 'express';
// import connectToMongo from './db.js';
// import cors from 'cors';

// Use MiddleWare to access req.body in the auth.
app.use(express.json());

// Use cors to direct api call through the browers
app.use(cors())

connectToMongo();

app.use('/api/auth/' , require('./routes/auth'));
app.use('/api/notes/' , require('./routes/notes.js'));


app.listen(port, () => {
  console.log(`iNoteBook app listening on port ${port}`)
})
