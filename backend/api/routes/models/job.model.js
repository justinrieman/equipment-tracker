const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  jobName: { type: String, required: true },
  jobNumber: { type: String },
  address: String,
  equipment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Equipment' }],
});

module.exports = mongoose.model('Job', jobSchema);
