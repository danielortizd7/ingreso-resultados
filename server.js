const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./app/database/databasemongo");
const resultadoRoutes = require("./app/routes/resultadoRoutes");

dotenv.config();
connectDB();

const app = express();

// Habilitar CORS para cualquier origen
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Definir rutas
app.use("/api/resultados", resultadoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
