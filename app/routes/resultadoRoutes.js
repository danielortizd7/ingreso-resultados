const express = require("express");
const router = express.Router();
const { registrarResultado, listarResultados } = require("../controllers/resultadoController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/registrar", authMiddleware, registrarResultado);
router.get("/listar", listarResultados);

module.exports = router;
