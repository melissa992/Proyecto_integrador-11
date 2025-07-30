const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    progresoQuiz: { type: Number, default: 0 },
    puntaje: { type: Number, default: 0 },
    historial: [{ fecha: Date, puntaje: Number }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
