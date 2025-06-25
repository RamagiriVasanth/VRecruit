const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  skillsRequired: [String],
  description: String,
  experienceLevel: String,
});

module.exports = mongoose.model('Job', jobSchema);
