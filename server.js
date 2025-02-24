const express = require("express");
const dotenv = require("dotenv");
const conectarDB = require("./app/database/databaseMongo"); // ✅ Ruta corregida
const resultadoRoutes = require("./app/routes/resultadoRoutes"); // ✅ Verifica que esta ruta exista
const cors = require("cors");

// 🔹 Cargar variables de entorno
dotenv.config();

// 🔹 Verificar que MONGO_URI esté definido
if (!process.env.MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI no está definido en el archivo .env");
  process.exit(1);
}

// 🔹 Conectar a la base de datos
conectarDB().catch((error) => {
  console.error("❌ No se pudo conectar a MongoDB:", error);
  process.exit(1);
});

// 🔹 Inicializar Express
const app = express();

// 🔹 Configurar CORS
app.use(cors({ origin: "*" })); // Cambia "*" por un dominio específico si es necesario

// 🔹 Middleware para analizar JSON
app.use(express.json());

// 🔹 Rutas de la API
app.use("/api", resultadoRoutes);

// 🔹 Definir el puerto
const PORT = process.env.PORT || 5000;

// 🔹 Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
