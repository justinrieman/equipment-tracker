const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  jobName: { type: String, required: true },
  jobNumber: { type: String, required: true },
  address: String,
  equipment: [String],
});

module.exports = mongoose.model('Job', jobSchema);
