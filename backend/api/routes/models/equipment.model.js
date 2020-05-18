const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  brand: String,
  model: String,
  image: String,
  job: String,
});

module.exports = mongoose.model('Equipment', equipmentSchema);
