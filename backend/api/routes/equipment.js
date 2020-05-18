const express = require('express');
const router = express.Router();

const Equipment = require('./models/equipment.model');

router.get('/', (req, res, next) => {
  Equipment.find()
    .then((equipment) => {
      res.status(200).json({ equipment });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get('/:equipmentId', (req, res, next) => {
  const equipmentId = req.params.equipmentId;
  res.status(200).json({ message: `GET request for ${equipmentId}` });
});

router.post('/', (req, res, next) => {
  res.status(201).json({ message: 'POST request in equipment route' });
});

router.patch('/:equipmentId', (req, res, next) => {
  const equipmentId = req.params.equipmentId;
  res.status(200).json({ message: `PATCH request for ${equipmentId}` });
});

module.exports = router;
