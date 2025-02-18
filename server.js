const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./app/database/databasemongo");
const resultadoRoutes = require("./app/routes/resultadoRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/resultados", resultadoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
