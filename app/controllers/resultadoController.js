const { registrarResultado } = require("../services/resultadoService");

const registrarResultadoController = async (req, res) => {
  try {
    const { cedula, ...datos } = req.body;

    if (!cedula || !req.nombreLaboratorista) {
      return res.status(400).json({ error: "Cédula inválida o laboratorista no autorizado" });
    }

    // Agregar el nombre del laboratorista antes de registrar
    datos.cedula = cedula;
    datos.nombreLaboratorista = req.nombreLaboratorista;

    const resultado = await registrarResultado(datos);
    res.status(201).json({ mensaje: "Resultado registrado con éxito", resultado });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { registrarResultado: registrarResultadoController };
