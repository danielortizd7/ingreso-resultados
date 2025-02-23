const Resultado = require("../models/resultadoModel");

// 🔹 Obtener todos los resultados
const obtenerResultados = async (req, res) => {
  try {
    const resultados = await Resultado.find();
    res.json(resultados);
  } catch (error) {
    console.error("❌ Error al obtener los resultados:", error.message);
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
    console.error("❌ Error al obtener la muestra:", error.message);
    res.status(500).json({ error: "Error al obtener la muestra" });
  }
};

// 🔹 Registrar un resultado
const registrarResultado = async (req, res) => {
  try {
    const { idMuestra, pH, turbidez, oxigenoDisuelto, nitratos, fosfatos, cedulaLaboratorista, nombreLaboratorista } = req.body;

    // ✅ Verificar que todos los campos obligatorios estén presentes
    if (!idMuestra || !pH || !turbidez || !oxigenoDisuelto || !nitratos || !fosfatos || !cedulaLaboratorista) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    // ✅ Verificar si ya existe un resultado con ese ID de muestra
    const existeResultado = await Resultado.findOne({ idMuestra });
    if (existeResultado) {
      return res.status(400).json({ error: "Ya existe un resultado con este ID de muestra" });
    }

    // ✅ Crear y guardar el nuevo resultado
    const nuevoResultado = new Resultado({
      idMuestra,
      pH,
      turbidez,
      oxigenoDisuelto,
      nitratos,
      fosfatos,
      cedulaLaboratorista,
      nombreLaboratorista: nombreLaboratorista || "Desconocido" // Asignar un valor por defecto si no está presente
    });

    await nuevoResultado.save();
    res.status(201).json({ message: "✅ Resultado registrado correctamente", resultado: nuevoResultado });

  } catch (error) {
    console.error("❌ Error al registrar resultado:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { obtenerResultados, obtenerMuestraPorId, registrarResultado };
