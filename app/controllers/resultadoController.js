const axios = require("axios");
const Resultado = require("../models/resultadoModel");

// 🔹 Obtener una muestra por ID con sus resultados
const obtenerMuestraPorId = async (req, res) => {
  try {
    const { idMuestra } = req.params;

    // Obtener la muestra desde el otro backend
    const response = await axios.get("https://backendregistromuestra.onrender.com/muestras");
    const muestra = response.data.find(m => m.id_muestra === idMuestra);

    if (!muestra) {
      return res.status(404).json({ error: `No se encontró la muestra con ID: ${idMuestra}` });
    }

    // Buscar si hay resultados registrados para esta muestra
    const resultado = await Resultado.findOne({ idMuestra });

    res.json({ muestra, resultado });
  } catch (error) {
    console.error("❌ Error al obtener la muestra:", error);
    res.status(500).json({ error: "Error al obtener la muestra" });
  }
};

// 🔹 Registrar un resultado para una muestra existente
const registrarResultado = async (req, res) => {
  try {
    const { idMuestra, pH, turbidez, oxigenoDisuelto, nitratos, fosfatos, cedula } = req.body;

    // 🔹 Verificar si la muestra existe en el otro backend
    const response = await axios.get("https://backendregistromuestra.onrender.com/muestras");
    const muestraExiste = response.data.some(m => m.id_muestra === idMuestra);

    if (!muestraExiste) {
      return res.status(400).json({ error: `La muestra con ID "${idMuestra}" no existe.` });
    }

    // 🔹 Verificar si ya hay un resultado registrado para esa muestra
    const resultadoExistente = await Resultado.findOne({ idMuestra });
    if (resultadoExistente) {
      return res.status(400).json({ error: `La muestra "${idMuestra}" ya tiene un resultado registrado.` });
    }

    // 🔹 Crear y guardar el resultado
    const nuevoResultado = new Resultado({
      idMuestra,
      pH,
      turbidez,
      oxigenoDisuelto,
      nitratos,
      fosfatos,
      cedulaLaboratorista: req.cedula,
      nombreLaboratorista: req.nombreLaboratorista,
      estado: "En análisis",
    });

    await nuevoResultado.save();
    res.status(201).json({ mensaje: "✅ Resultado registrado con éxito", resultado: nuevoResultado });

  } catch (error) {
    console.error("❌ Error al registrar el resultado:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { obtenerMuestraPorId, registrarResultado };
