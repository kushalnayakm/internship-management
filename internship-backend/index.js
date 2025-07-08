const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Submission = require('./models/Submission');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/internship_db')
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

app.post('/api/submit', async (req, res) => {
  const data = new Submission(req.body);
  await data.save();
  res.json({ success: true });
});

app.get('/api/submissions', async (req, res) => {
  const data = await Submission.find();
  res.json(data);
});

app.delete('/api/submissions/:id', async (req, res) => {
  await Submission.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.put('/api/submissions/:id', async (req, res) => {
  await Submission.findByIdAndUpdate(req.params.id, req.body);
  res.json({ success: true });
});

app.listen(5000, () => {
  console.log('🚀 Backend running on http://localhost:5000');
});
