const express = require("express");
const router = express.Router();
const { registrarResultado, obtenerMuestraPorId, obtenerResultados } = require("../controllers/resultadoController");

// 🔹 Obtener todos los resultados
router.get("/resultados", obtenerResultados);

// 🔹 Obtener información de una muestra por ID
router.get("/muestra/:idMuestra", obtenerMuestraPorId);

// 🔹 Registrar un resultado (quitamos authMiddleware para probar)
router.post("/registrar", registrarResultado);

module.exports = router;
