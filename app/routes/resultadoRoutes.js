const express = require("express");
const router = express.Router();
const { registrarResultado, obtenerMuestraPorId, obtenerResultados } = require("../controllers/resultadoController");
const authMiddleware = require("../middleware/authMiddleware");

// 🔹 Obtener todos los resultados
router.get("/resultados", obtenerResultados);

// 🔹 Obtener información de una muestra por ID
router.get("/muestra/:idMuestra", obtenerMuestraPorId);

// 🔹 Registrar un resultado (solo laboratoristas autorizados)
router.post("/registrar", authMiddleware, registrarResultado);

module.exports = router;
