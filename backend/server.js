const path = require('path');
const nocache = require('nocache');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const fileupload = require('express-fileupload');
var cors = require('cors');

const app = express();

app.use(nocache());

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Load env variables
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// File Uploading
app.use(fileupload());

// Route files
const students = require('./routes/students');

app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/students', students);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${process.env.PORT}`
      .green.bold
  )
);
