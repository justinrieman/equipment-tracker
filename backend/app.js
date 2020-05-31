const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.MONGO_ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set('useCreateIndex', true);

mongoose.connection.once('open', () => {
  console.log('Mongo connection established successfully');
});

const userRoute = require('./api/routes/users');
const equipmentRoute = require('./api/routes/equipment');
const jobRoute = require('./api/routes/jobs');

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.use('/users', userRoute);
app.use('/equipment', equipmentRoute);
app.use('/jobs', jobRoute);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
