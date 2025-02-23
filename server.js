const express = require("express");
const dotenv = require("dotenv");
const conectarDB = require("./app/database/databasemongo");
const resultadoRoutes = require("./app/routes/resultadoRoutes");
const cors = require("cors");

dotenv.config();
conectarDB();

const app = express();

// 🔹 Habilitar CORS para permitir solicitudes desde el frontend
app.use(cors({ origin: "*" }));  // ✅ Agregado para evitar el error de CORS

app.use(express.json()); // Middleware para manejar JSON
app.use("/api", resultadoRoutes); // Prefijo para todas las rutas de resultados

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
