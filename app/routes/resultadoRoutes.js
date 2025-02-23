const express = require("express");
const router = express.Router();
const { registrarResultado, obtenerMuestraPorId, obtenerResultados } = require("../controllers/resultadoController");
const authMiddleware = require("../middlewares/authMiddleware");  // Importamos el middleware

// 🔹 Obtener todos los resultados
router.get("/resultados", obtenerResultados);

// 🔹 Obtener información de una muestra por ID
router.get("/muestra/:idMuestra", obtenerMuestraPorId);

// 🔹 Registrar un resultado (con autenticación)
router.post("/registrar", authMiddleware, registrarResultado);

module.exports = router;
