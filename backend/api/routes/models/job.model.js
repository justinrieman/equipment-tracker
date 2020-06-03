const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  jobName: { type: String, required: true },
  jobNumber: { type: String, required: true },
  address: String,
  equipment: [String],
});

module.exports = mongoose.model('Job', jobSchema);
