const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/calculator', require('./routes/calculatorRoutes'));
app.use('/api/credit-types', require('./routes/creditTypeRoutes'));
app.use('/admin', require('./routes/adminRoutes'));


module.exports = app;
