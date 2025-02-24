const Resultado = require("../models/resultadoModel");

const laboratoristas = {
  "12345678": "Juan Pérez",
  "87654321": "María Gómez",
  "11223344": "Carlos López",
};

// 🔹 Obtener el nombre del laboratorista por cédula
exports.obtenerLaboratoristaPorCedula = async (req, res) => {
  try {
    const { cedula } = req.params;
    console.log(`🔍 Buscando laboratorista con cédula: ${cedula}`);

    if (laboratoristas[cedula]) {
      return res.json({ nombre: laboratoristas[cedula] });
    }

    return res.status(404).json({ error: "Laboratorista no encontrado" });
  } catch (error) {
    console.error("❌ Error en obtenerLaboratoristaPorCedula:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// 🔹 Obtener todos los resultados
exports.obtenerResultados = async (req, res) => {
  try {
    console.log("📥 Solicitando todos los resultados...");
    const resultados = await Resultado.find();
    res.json(resultados);
  } catch (error) {
    console.error("❌ Error obteniendo resultados:", error);
    res.status(500).json({ error: "Error obteniendo resultados" });
  }
};

// 🔹 Registrar un resultado
exports.registrarResultado = async (req, res) => {
  try {
    console.log("📥 Datos recibidos:", req.body);

    let { idMuestra, pH, turbidez, oxigenoDisuelto, nitratos, fosfatos, cedulaLaboratorista } = req.body;

    // 🔹 Convertir valores numéricos si son strings
    pH = parseFloat(pH);
    turbidez = parseFloat(turbidez);
    oxigenoDisuelto = parseFloat(oxigenoDisuelto);
    nitratos = parseFloat(nitratos);
    fosfatos = parseFloat(fosfatos);

    // 🔹 Validación de campos obligatorios
    if (!idMuestra || isNaN(pH) || isNaN(turbidez) || isNaN(oxigenoDisuelto) || isNaN(nitratos) || isNaN(fosfatos) || !cedulaLaboratorista) {
      return res.status(400).json({ error: "Todos los campos son obligatorios y deben tener valores válidos" });
    }

    // 🔹 Obtener el nombre del laboratorista
    const nombreLaboratorista = laboratoristas[cedulaLaboratorista] || "Desconocido";

    // 🔹 Crear y guardar el nuevo resultado
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
    console.log("✅ Resultado registrado exitosamente:", nuevoResultado);

    res.status(201).json({ message: "Resultado registrado exitosamente", resultado: nuevoResultado });
  } catch (error) {
    console.error("❌ Error registrando el resultado:", error);
    res.status(500).json({ error: "Error registrando el resultado" });
  }
};
