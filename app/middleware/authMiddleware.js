const laboratoristasPermitidos = {
    "12345678": "Juan Pérez",
    "87654321": "María Gómez",
    "11223344": "Carlos López"
  };
  
  const authMiddleware = (req, res, next) => {
    const { cedula } = req.body;
  
    if (!cedula || !laboratoristasPermitidos[cedula]) {
      return res.status(403).json({ error: "Acceso denegado: Usuario no autorizado" });
    }
  
    req.nombreLaboratorista = laboratoristasPermitidos[cedula]; // Agregar el nombre al request
    next();
  };
  
  module.exports = authMiddleware;
  