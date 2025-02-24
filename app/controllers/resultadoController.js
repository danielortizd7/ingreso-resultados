const Resultado = require("../models/resultadoModel");

// 🔹 Lista de laboratoristas predefinidos
const laboratoristas = {
  "12345678": "Juan Pérez",
  "87654321": "María Gómez",
  "11223344": "Carlos López",
};

// 🔹 Obtener el nombre del laboratorista por cédula
exports.obtenerLaboratoristaPorCedula = async (req, res) => {
  const { cedula } = req.params;

  if (laboratoristas[cedula]) {
    return res.json({ nombre: laboratoristas[cedula] });
  }

  return res.status(404).json({ error: "Laboratorista no encontrado" });
};

// 🔹 Obtener todos los resultados
exports.obtenerResultados = async (req, res) => {
  try {
    const resultados = await Resultado.find();
    res.json(resultados);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo resultados" });
  }
};

// 🔹 Registrar un resultado
exports.registrarResultado = async (req, res) => {
  try {
    const { idMuestra, pH, turbidez, oxigenoDisuelto, nitratos, fosfatos, cedulaLaboratorista } = req.body;

    if (!idMuestra || !pH || !turbidez || !oxigenoDisuelto || !nitratos || !fosfatos || !cedulaLaboratorista) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const nombreLaboratorista = laboratoristas[cedulaLaboratorista] || "Desconocido";

    const nuevoResultado = new Resultado({
      idMuestra,
      pH,
      turbidez,
      oxigenoDisuelto,
      nitratos,
      fosfatos,
      cedulaLaboratorista,
      nombreLaboratorista,
    });

    await nuevoResultado.save();
    res.status(201).json({ message: "Resultado registrado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error registrando el resultado" });
  }
};
