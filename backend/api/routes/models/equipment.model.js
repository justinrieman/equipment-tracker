const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  brand: { type: String, required: true },
  model: String,
  image: String,
  location: String,
});

module.exports = mongoose.model('Equipment', equipmentSchema);
