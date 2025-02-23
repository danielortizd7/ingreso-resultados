const Resultado = require("../models/resultadoModel");

// 🔹 Registrar un resultado
const registrarResultado = async (req, res) => {
  try {
    const { idMuestra, pH, turbidez, oxigenoDisuelto, nitratos, fosfatos, cedulaLaboratorista } = req.body;

    if (!idMuestra || !pH || !turbidez || !oxigenoDisuelto || !nitratos || !fosfatos || !cedulaLaboratorista) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const existeResultado = await Resultado.findOne({ idMuestra });
    if (existeResultado) {
      return res.status(400).json({ error: "Ya existe un resultado con este ID de muestra" });
    }

    // ⚡ Tomamos el nombre del laboratorista desde el middleware
    const nombreLaboratorista = req.nombreLaboratorista;

    const nuevoResultado = new Resultado({
      idMuestra,
      pH,
      turbidez,
      oxigenoDisuelto,
      nitratos,
      fosfatos,
      cedulaLaboratorista,
      nombreLaboratorista
    });

    await nuevoResultado.save();
    res.status(201).json({ message: "Resultado registrado correctamente", resultado: nuevoResultado });

  } catch (error) {
    console.error("❌ Error al registrar resultado:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { obtenerResultados, obtenerMuestraPorId, registrarResultado };
