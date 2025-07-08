const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  name: String,
  usn: String,
  collegeName: String,
  projectTitle: String,
  passNumber: String,
  duration: String,
  fromDate: String,
  toDate: String,
  mobile: String,
  date: String
});

module.exports = mongoose.model('Submission', submissionSchema);
