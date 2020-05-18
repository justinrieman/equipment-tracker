const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Jobs = require('./models/job.model');

router.get('/', (req, res, next) => {
  res.status(200).json({ message: 'GET request in Job route' });
});

router.get('/:jobId', (req, res, next) => {
  const jobId = req.params.jobId;
  res.status(200).json({ message: `GET request for ${jobId}` });
});

router.post('/', (req, res, next) => {
  res.status(201).json({ message: 'POST request in Job route' });
});

router.patch('/:jobId', (req, res, next) => {
  const jobId = req.params.jobId;
  res.status(200).json({ message: `PATCH request for ${jobId}` });
});

module.exports = router;
