const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  equipType: { type: String, required: true },
  equipBrand: { type: String, required: true },
  equipModel: String,
  equipImage: String,
  equipLocation: String,
});

module.exports = mongoose.model('Equipment', equipmentSchema);
