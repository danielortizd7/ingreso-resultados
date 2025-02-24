const express = require("express");
const router = express.Router();
const {
  registrarResultado,
  obtenerResultados,
  obtenerLaboratoristaPorCedula,
} = require("../controllers/resultadoController");

// 🔹 Obtener todos los resultados
router.get("/resultados", obtenerResultados);

// 🔹 Registrar un resultado
router.post("/registrar", registrarResultado);

// 🔹 Obtener nombre del laboratorista por cédula
router.get("/laboratorista/:cedula", obtenerLaboratoristaPorCedula);

module.exports = router;
