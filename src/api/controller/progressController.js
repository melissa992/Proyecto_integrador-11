import UserProgress from '../models/UserProgress.js';

export const saveProgress = async (req, res) => {
  const { userId, userName, score, totalQuestions } = req.body;

  try {
    const progress = await UserProgress.findOneAndUpdate(
      { userId },
      { score, totalQuestions, completed: true, userName },
      { new: true, upsert: true }
    );
    res.status(200).json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const data = await UserProgress.find({ completed: true })
      .sort({ score: -1 })
      .limit(10);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
