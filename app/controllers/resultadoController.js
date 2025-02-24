exports.obtenerResultados = async (req, res) => {
  try {
    const resultados = await Resultado.find();
    res.json(resultados);
  } catch (error) {
    console.error("❌ Error obteniendo resultados:", error);
    res.status(500).json({ error: "Error obteniendo resultados" });
  }
};

exports.registrarResultado = async (req, res) => {
  try {
    const { idMuestra, pH, turbidez, oxigenoDisuelto, nitratos, fosfatos, cedulaLaboratorista } = req.body;

    if (!idMuestra || isNaN(pH) || isNaN(turbidez) || isNaN(oxigenoDisuelto) || isNaN(nitratos) || isNaN(fosfatos) || !cedulaLaboratorista) {
      console.log("🚨 Error: Campos faltantes o inválidos", { idMuestra, pH, turbidez, oxigenoDisuelto, nitratos, fosfatos, cedulaLaboratorista });
      return res.status(400).json({ error: "Todos los campos son obligatorios y deben tener valores válidos" });
    }

    const nuevoResultado = new Resultado({ idMuestra, pH, turbidez, oxigenoDisuelto, nitratos, fosfatos, cedulaLaboratorista });
    await nuevoResultado.save();
    
    res.status(201).json({ message: "Resultado registrado exitosamente", resultado: nuevoResultado });
  } catch (error) {
    console.error("❌ Error registrando el resultado:", error);
    res.status(500).json({ error: "Error registrando el resultado" });
  }
};

exports.obtenerLaboratoristaPorCedula = async (req, res) => {
  try {
    const laboratoristas = {
      "12345678": "Juan Pérez",
      "87654321": "María Gómez",
      "11223344": "Carlos López",
    };

    const { cedula } = req.params;
    if (laboratoristas[cedula]) {
      return res.json({ nombre: laboratoristas[cedula] });
    }
    
    return res.status(404).json({ error: "Laboratorista no encontrado" });
  } catch (error) {
    console.error("❌ Error en obtenerLaboratoristaPorCedula:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
