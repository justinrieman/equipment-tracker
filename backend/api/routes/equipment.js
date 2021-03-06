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
  const userId = req.query.userId;
  Equipment.find({ userId: userId })
    .exec()
    .then((docs) => {
      docs.forEach((doc) =>
        doc.available ? console.log(doc.available) : null
      );
      const response = {
        equipment: docs.map((doc) => {
          return {
            _id: doc._id,
            equipType: doc.equipType,
            equipBrand: doc.equipBrand,
            equipModel: doc.equipModel,
            equipImage: doc.equipImage,
            equipLocation: doc.equipLocation,
            equipLocationId: doc.equipLocationId,
            available: doc.available ? doc.available : false,
            needsMaintenance: doc.needsMaintenance
              ? doc.needsMaintenance
              : false,
            rentalDate: doc.rentalDate,
            attachments: doc.attachments,
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
    userId: req.body.userId,
    equipType: req.body.equipType,
    equipBrand: req.body.equipBrand,
    equipModel: req.body.equipModel,
    equipImage: req.file ? req.file.path : 'uploads/no-img.png',
    equipLocation: req.body.equipLocation,
    equipLocationId: req.body.equipLocationId,
    available: false,
    needsMaintenance: false,
    rentalDate: req.body.rentalDate,
    attachments: [],
  });

  equipment
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Created successfully',
        createdEquipment: {
          _id: result._id,
          userId: result.userId,
          equipType: result.equipType,
          equipBrand: result.equipBrand,
          equipModel: result.equipModel,
          equipImage: result.equipImage,
          equipLocation: result.equipLocation,
          equipLocationId: result.equipLocationId,
          available: result.available,
          needsMaintenance: result.needsMaintenance,
          rentalDate: result.rentalDate,
          attachments: result.attachments,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      console.log(err);
    });
});

router.patch('/:equipmentId', upload.single('equipImage'), (req, res, next) => {
  const equipmentId = req.params.equipmentId;

  let updatedEquipment = {
    _id: equipmentId,
    userId: req.body.userId,
    equipType: req.body.equipType,
    equipBrand: req.body.equipBrand,
    equipModel: req.body.equipModel,
    equipImage: req.file ? req.file.path : req.body.equipImage,
    equipLocation: req.body.equipLocation,
    rentalDate: req.body.rentalDate,
    attachments: req.body.attachments ? req.body.attachments : [],
    available: req.body.available,
    needsMaintenance: req.body.needsMaintenance,
  };

  // equipLocationId is only added if there is a location
  // it is a mongo id found on the frontend

  if (updatedEquipment.equipLocation) {
    updatedEquipment.equipLocationId = req.body.equipLocationId;
  }

  Equipment.findOneAndUpdate({ _id: equipmentId }, updatedEquipment, {
    new: true,
  })
    .then((doc) => {
      res.status(201).json({
        message: 'Equipment updated successfully',
        updatedEquipment: {
          _id: doc._id,
          userId: doc.userId,
          equipType: doc.equipType,
          equipBrand: doc.equipBrand,
          equipModel: doc.equipModel,
          equipImage: doc.equipImage,
          equipLocation: doc.equipLocation,
          equipLocationId: doc.equipLocationId,
          rentalDate: doc.rentalDate,
          attachments: doc.attachments,
          available: doc.available,
          needsMaintenance: doc.needsMaintenance,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.patch('/attachments/:equipmentId', (req, res, next) => {
  const equipmentId = req.params.equipmentId;

  const attachments = req.body;

  Equipment.findByIdAndUpdate(
    { _id: equipmentId },
    { attachments: attachments },
    { new: true }
  ).then((doc) => {
    res.status(201).json({ doc });
  });
});

router.patch('/available/:equipmentId', (req, res, next) => {
  const equipmentId = req.params.equipmentId;

  Equipment.findByIdAndUpdate(
    { _id: equipmentId },
    { available: true },
    { new: true }
  ).then((doc) => {
    res.status(201).json({ doc });
  });
});

router.patch('/unavailable/:equipmentId', (req, res, next) => {
  const equipmentId = req.params.equipmentId;

  Equipment.findByIdAndUpdate(
    { _id: equipmentId },
    { available: false },
    { new: true }
  ).then((doc) => {
    res.status(201).json({ doc });
  });
});

router.patch('/maintenance/:equipmentId', (req, res, next) => {
  const equipmentId = req.params.equipmentId;
  const maintenance = req.body.maintenance;

  if (maintenance) {
    Equipment.findByIdAndUpdate(
      { _id: equipmentId },
      { needsMaintenance: true },
      { new: true }
    ).then((doc) => {
      res.status(201).json({ doc });
    });
  }

  if (!maintenance) {
    Equipment.findByIdAndUpdate(
      { _id: equipmentId },
      { needsMaintenance: false },
      { new: true }
    ).then((doc) => {
      res.status(201).json({ doc });
    });
  }
});

router.delete('/:equipmentId', (req, res, next) => {
  Equipment.findById(req.params.equipmentId)
    .then((item) => {
      item.remove().then(() => {
        res.json({ message: 'Equipment deleted successfully' });
      });
    })
    .catch((err) => {
      res.status(404).json({ err });
    });
});

module.exports = router;
