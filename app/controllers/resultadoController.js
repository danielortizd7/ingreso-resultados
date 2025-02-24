const axios = require("axios");
const Resultado = require("../models/resultadoModel");

exports.registrarResultado = async (req, res) => {
    try {
        const { idMuestra, pH, turbidez, oxigenoDisuelto, nitratos, fosfatos, cedulaLaboratorista, nombreLaboratorista } = req.body;

        // Validaciones
        if (
            !idMuestra?.trim() ||
            !cedulaLaboratorista?.trim() ||
            !nombreLaboratorista?.trim() ||
            !Number.isFinite(pH) ||
            !Number.isFinite(turbidez) ||
            !Number.isFinite(oxigenoDisuelto) ||
            !Number.isFinite(nitratos) ||
            !Number.isFinite(fosfatos)
        ) {
            return res.status(400).json({ error: "Todos los campos son obligatorios y deben tener valores válidos" });
        }

        // Obtener detalles de la muestra desde la API externa
        const response = await axios.get("https://backendregistromuestra.onrender.com/muestras");
        const muestras = response.data;
        const muestraEncontrada = muestras.find(m => m.id_muestra === idMuestra);

        if (!muestraEncontrada) {
            return res.status(404).json({ error: "Muestra no encontrada" });
        }

        // Crear el nuevo resultado
        const nuevoResultado = new Resultado({
            idMuestra: idMuestra.trim(),
            pH,
            turbidez,
            oxigenoDisuelto,
            nitratos,
            fosfatos,
            cedulaLaboratorista: cedulaLaboratorista.trim(),
            nombreLaboratorista: nombreLaboratorista.trim(),
        });

        await nuevoResultado.save();

        // Combinar los datos de la muestra con el resultado
        const registroCompleto = {
            ...muestraEncontrada,
            resultado: nuevoResultado.toObject() // Convertir el modelo a objeto para evitar problemas con mongoose
        };

        res.status(201).json({ message: "Resultado registrado exitosamente", registro: registroCompleto });
    } catch (error) {
        console.error("❌ Error registrando el resultado:", error);
        res.status(500).json({ error: "Error registrando el resultado" });
    }
};
