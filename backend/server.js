
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();


const feedbackRoutes = require('./routes/feedback');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;