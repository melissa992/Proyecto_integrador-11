const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String },
  score: { type: Number, required: true },
  totalQuestions: { type: Number },
  completed: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserProgress', userProgressSchema);
