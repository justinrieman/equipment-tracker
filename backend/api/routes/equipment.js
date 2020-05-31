const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const Equipment = require('./models/equipment.model');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.get('/', (req, res, next) => {
  console.log(req.headers.equiptype);
  Equipment.find({ equipType: req.headers.equiptype })
    .exec()
    .then((docs) => {
      const response = {
        equipment: docs.map((doc) => {
          return {
            _id: doc._id,
            equipType: doc.equipType,
            equipBrand: doc.equipBrand,
            equipModel: doc.equipModel,
            equipImage: doc.equipImage,
            equipLocation: doc.equipLocation,
          };
        }),
      };

      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get('/:equipmentId', (req, res, next) => {
  const equipmentId = req.params.equipmentId;
  res.status(200).json({ message: `GET request for ${equipmentId}` });
});

router.post('/', upload.single('equipImage'), (req, res, next) => {
  const equipment = new Equipment({
    _id: new mongoose.Types.ObjectId(),
    equipType: req.body.equipType,
    equipBrand: req.body.equipBrand,
    equipModel: req.body.equipModel,
    equipImage: req.file ? req.file.path : 'uploads/no-img.png',
    equipLocation: req.body.equipLocation,
  });

  equipment
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Created successfully',
        createdEquipment: {
          _id: result._id,
          equipType: result.equipType,
          equipBrand: result.equipBrand,
          equipModel: result.equipModel,
          equipImage: result.equipImage,
          equipLocation: result.equipLocation,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.patch('/:equipmentId', (req, res, next) => {
  const equipmentId = req.params.equipmentId;
  res.status(200).json({ message: `PATCH request for ${equipmentId}` });
});

module.exports = router;
