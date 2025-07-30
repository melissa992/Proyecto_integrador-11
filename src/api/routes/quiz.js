// backend/routes/quiz.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Guardar o actualizar progreso y puntaje
router.post('/progress', async (req, res) => {
  const { uid, nombre, progresoQuiz, puntaje } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { uid },
      {
        nombre,
        progresoQuiz,
        puntaje,
        $push: { historial: { fecha: new Date(), puntaje } }
      },
      { upsert: true, new: true }
    );
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error guardando progreso" });
  }
});


router.get("/leaderboard", async (req, res) => {
  try {
    const topUsers = await User.find()
      .sort({ puntaje: -1 })
      .limit(3)
      .select("nombre puntaje"); // o displayName si es tu campo principal
    res.json(topUsers);
  } catch (err) {
    console.error("Error en leaderboard:", err);
    res.status(500).json({ success: false, error: "Error del servidor" });
  }
});


// (Opcional) Obtener progreso y puntaje de un usuario por uid
router.get('/progress/:uid', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ success: false, error: "Usuario no encontrado" });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error obteniendo usuario" });
  }
});

module.exports = router;
