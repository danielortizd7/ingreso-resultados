const Resultado = require("../models/ResultadoModel");

// 🔹 Obtener todos los resultados
const obtenerResultados = async (req, res) => {
  try {
    const resultados = await Resultado.find();
    res.json(resultados);
  } catch (error) {
    console.error("❌ Error al obtener los resultados:", error);
    res.status(500).json({ error: "Error al obtener los resultados" });
  }
};

// 🔹 Obtener un resultado por ID de muestra
const obtenerMuestraPorId = async (req, res) => {
  try {
    const resultado = await Resultado.findOne({ idMuestra: req.params.idMuestra });
    if (!resultado) {
      return res.status(404).json({ error: "Resultado no encontrado" });
    }
    res.json(resultado);
  } catch (error) {
    console.error("❌ Error al obtener la muestra:", error);
    res.status(500).json({ error: "Error al obtener la muestra" });
  }
};

// 🔹 Registrar un resultado
const registrarResultado = async (req, res) => {
  try {
    const { idMuestra, pH, turbidez, oxigenoDisuelto, nitratos, fosfatos, cedulaLaboratorista, nombreLaboratorista } = req.body;

    if (!idMuestra || !pH || !turbidez || !oxigenoDisuelto || !nitratos || !fosfatos || !cedulaLaboratorista || !nombreLaboratorista) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const existeResultado = await Resultado.findOne({ idMuestra });
    if (existeResultado) {
      return res.status(400).json({ error: "Ya existe un resultado con este ID de muestra" });
    }

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
