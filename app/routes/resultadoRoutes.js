const express = require("express");
const router = express.Router();
const Resultado = require("../models/resultadoModel");  // Importar el modelo
const { registrarResultado } = require("../controllers/resultadoController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/registrar", authMiddleware, registrarResultado);

// 🟢 Nueva ruta para obtener los resultados
router.get("/listar", async (req, res) => {
  try {
    const resultados = await Resultado.find();  // Obtener todos los resultados
    res.json(resultados);
  } catch (error) {
    console.error("❌ Error al obtener los resultados:", error); // Imprime el error en la consola
    res.status(500).json({ error: "Error al obtener los resultados" });
  }
});

module.exports = router;
