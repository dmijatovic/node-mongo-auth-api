
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
const port = process.env.PORT || 3001;
const mongoose = require('mongoose');
const mdb = 'mongodb://localhost/auth';
const cors = require('cors');
//initialize express server
let api = express();
//allow access from anywhere
api.use(cors());
//use json body parser
api.use(bodyParser.json());

//connect to auth database on localhost
mongoose.connect(mdb)
.then(db => {
  console.log("MongoDB connected...");
});

//define routes 
router(api);

//listen to a port
api.listen(port,()=>{
  console.log("Server api on port...", port);
});

