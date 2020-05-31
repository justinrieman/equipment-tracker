const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Job = require('./models/job.model');

router.get('/', (req, res, next) => {
  Job.find()
    .exec()
    .then((docs) => {
      const response = {
        jobs: docs.map((doc) => {
          return {
            _id: doc._id,
            jobName: doc.jobName,
            jobNumber: doc.jobNumber,
            address: doc.address,
            equipment: doc.equipment,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Job.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          job: doc,
        });
      } else {
        res.status(404).json({ message: 'No job found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post('/', (req, res, next) => {
  const job = new Job({
    _id: new mongoose.Types.ObjectId(),
    jobName: req.body.jobName,
    jobNumber: req.body.jobNumber,
    address: req.body.address,
    equipment: req.body.equipment,
  });

  job
    .save()
    .then((result) => {
      res.status(200).json({
        message: 'Job created successfully!',
        createdJob: {
          _id: result._id,
          jobName: result.jobName,
          jobNumber: result.jobNumber,
          address: result.address,
          equipment: result.equipment,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.patch('/:jobId', (req, res, next) => {
  const jobId = req.params.jobId;
  res.status(200).json({ message: `PATCH request for ${jobId}` });
});

module.exports = router;
