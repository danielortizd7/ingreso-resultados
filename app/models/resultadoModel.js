const mongoose = require("mongoose");

const resultadoSchema = new mongoose.Schema({
  idMuestra: { type: String, required: true, unique: true }, // ID ingresado manualmente
  fechaAnalisis: { type: Date, default: Date.now },
  pH: { type: Number, required: true, min: 0, max: 14 },
  turbidez: { type: Number, required: true, min: 0 },
  oxigenoDisuelto: { type: Number, required: true, min: 0 },
  nitratos: { type: Number, required: true, min: 0 },
  fosfatos: { type: Number, required: true, min: 0 },
  cedulaLaboratorista: { type: String, required: true }, // Cedula del laboratorista
  nombreLaboratorista: { type: String, required: true }  // Nombre del laboratorista
});

module.exports = mongoose.model("Resultado", resultadoSchema);
