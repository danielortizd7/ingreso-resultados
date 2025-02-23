const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./app/database/databasemongo");
const resultadoRoutes = require("./app/routes/resultadoRoutes");

dotenv.config();
connectDB();

const app = express();

// Habilitar CORS correctamente (opcional: configuración avanzada)
app.use(cors({
  origin: "*", // Permite solicitudes desde cualquier origen
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware para parsear JSON
app.use(express.json());

// Middleware para logs (útil para depuración)
app.use((req, res, next) => {
  console.log(`📡 [${req.method}] ${req.url}`, req.body); // Verifica qué datos llegan
  next();
});

// Definir rutas
app.use("/api/resultados", resultadoRoutes);

// Capturar rutas no encontradas (evita errores 500 inesperados)
app.use((req, res) => {
  res.status(404).json({ mensaje: "Ruta no encontrada" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
