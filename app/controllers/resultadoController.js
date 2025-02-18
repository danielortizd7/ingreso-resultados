const { registrarResultado } = require("../services/resultadoService");

const registrarResultadoController = async (req, res) => {
  try {
    const { cedula, ...datos } = req.body;

    if (!cedula || !req.nombreLaboratorista) {
      return res.status(400).json({ error: "Cédula inválida o laboratorista no autorizado" });
    }

    // Asignar el nombre y cédula correctamente antes de registrar
    datos.cedulaLaboratorista = cedula;  // 🔹 Asegurar que el nombre es el esperado en el modelo
    datos.nombreLaboratorista = req.nombreLaboratorista;

    const resultado = await registrarResultado(datos);
    res.status(201).json({ mensaje: "Resultado registrado con éxito", resultado });
  } catch (error) {
    res.status(400).json({ error: "Error al registrar el resultado: " + error.message });
  }
};

module.exports = { registrarResultado: registrarResultadoController };
