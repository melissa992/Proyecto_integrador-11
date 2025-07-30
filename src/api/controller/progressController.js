const UserProgress = require('../models/UserProgress.js');

const saveProgress = async (req, res) => {
  const { userId, userName, score, totalQuestions } = req.body;

  try {
    const progress = new UserProgress({
      userId,
      userName,
      score,
      totalQuestions,
      completed: true
    });
    await progress.save();
    res.status(200).json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getLeaderboard = async (req, res) => {
  try {
    // Obtener el mejor puntaje por usuario
    const data = await UserProgress.aggregate([
      { $match: { completed: true } },
      { $sort: { score: -1 } },
      {
        $group: {
          _id: "$userId",
          userName: { $first: "$userName" },
          score: { $first: "$score" },
          totalQuestions: { $first: "$totalQuestions" }
        }
      },
      { $sort: { score: -1 } },
      { $limit: 10 }
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { saveProgress, getLeaderboard };
