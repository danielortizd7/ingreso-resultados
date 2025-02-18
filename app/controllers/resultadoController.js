const { registrarResultado } = require("../services/resultadoService");
const Resultado = require("../models/resultadoModel");

// Controlador para registrar un resultado
const registrarResultadoController = async (req, res) => {
  try {
    const { cedula, ...datos } = req.body;

    if (!cedula || !req.nombreLaboratorista) {
      return res.status(400).json({ error: "Cédula inválida o laboratorista no autorizado" });
    }

    // Agregar el nombre del laboratorista antes de registrar
    datos.cedulaLaboratorista = cedula;
    datos.nombreLaboratorista = req.nombreLaboratorista;

    const resultado = await registrarResultado(datos);
    res.status(201).json({
      mensaje: "Resultado registrado con éxito",
      resultado
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controlador para listar resultados
const listarResultados = async (req, res) => {
  try {
    const resultados = await Resultado.find();
    res.json(resultados);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los resultados" });
  }
};

module.exports = { registrarResultado: registrarResultadoController, listarResultados };
