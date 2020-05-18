const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

let User = require('./models/user.model');

router.get('/signup', (req, res, next) => {
  res.json({ message: 'GET user route' });
});

router.post('/signup', (req, res, next) => {
  console.log(req.body.email, req.body.password);

  const user = new User({
    _id: mongoose.Types.ObjectId(),
    email: req.body.email,
    password: req.body.password,
  });

  user
    .save()
    .then(() => {
      res.status(201).json({ message: 'User created!' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
