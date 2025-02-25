const express = require("express");
const router = express.Router();
const resultadoController = require("../controllers/resultadoController");

// Middleware para manejar errores en rutas asíncronas (corregido)
const asyncHandler = (fn) => {
  if (typeof fn !== "function") {
    throw new TypeError("❌ asyncHandler necesita una función válida.");
  }
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
};

// 🔹 Obtener todos los resultados
router.get("/resultados", asyncHandler(resultadoController.obtenerResultados));

// 🔹 Registrar un resultado
router.post("/registrar", asyncHandler(resultadoController.registrarResultado));

// 🔹 Obtener nombre del laboratorista por cédula
router.get("/laboratorista/:cedula", asyncHandler(resultadoController.obtenerLaboratoristaPorCedula));

module.exports = router;
