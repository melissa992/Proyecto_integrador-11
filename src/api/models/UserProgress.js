import mongoose from 'mongoose';

const userProgressSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  userName: { type: String },
  score: { type: Number, required: true },
  totalQuestions: { type: Number },
  completed: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

export default mongoose.model('UserProgress', userProgressSchema);
