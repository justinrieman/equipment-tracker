const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Job = require('./models/job.model');
const Equipment = require('./models/equipment.model');

router.get('/', (req, res, next) => {
  const userId = req.headers.userid;
  Job.find({ userId: userId })
    .populate({
      path: 'equipment',
    })
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
  let jobEquipment;
  Equipment.find({ equipLocationId: id })
    .exec()
    .then((doc) => {
      if (doc) {
        jobEquipment = doc;
      }
    });
  Job.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          job: doc,
          equipment: jobEquipment,
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
    userId: req.body.userId,
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
          userId: req.body.userId,
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
  console.log(req.params.jobId);
  console.log(req.body);

  Job.findOneAndUpdate({ _id: req.params.jobId }, req.body, { new: true })
    .then((doc) => {
      res.status(201).json({
        message: 'Job updated successfully',
        updatedJob: {
          _id: doc._id,
          userId: doc.userId,
          jobName: doc.jobName,
          jobNumber: doc.jobNumber,
          address: doc.address,
          equipment: doc.equipment,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.delete('/:jobId', (req, res, next) => {
  Job.findById(req.params.jobId)
    .then((item) =>
      item
        .remove()
        .then(() => res.json({ message: 'Job deleted successfully' }))
    )
    .catch((err) => res.status(404).json({ err }));
});

module.exports = router;
