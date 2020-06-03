const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  equipType: { type: String, required: true },
  equipBrand: { type: String, required: true },
  equipModel: String,
  equipImage: String,
  equipLocation: String,
});

module.exports = mongoose.model('Equipment', equipmentSchema);
