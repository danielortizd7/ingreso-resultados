const express = require("express");
const router = express.Router();
const { registrarResultado } = require("../controllers/resultadoController");
const authMiddleware = require("../middleware/authMiddleware");
const Resultado = require("../models/resultadoModel");  // Asegurar que el modelo está importado correctamente

// Ruta para registrar resultados
router.post("/registrar", authMiddleware, registrarResultado);

// 🟢 Ruta corregida para listar resultados
router.get("/listar", async (req, res) => {
  try {
    const resultados = await Resultado.find();  // Obtener todos los resultados
    res.json(resultados);
  } catch (error) {
    console.error("❌ Error al obtener los resultados:", error);
    res.status(500).json({ error: "Error al obtener los resultados" });
  }
});

module.exports = router;
