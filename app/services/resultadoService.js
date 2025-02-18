const Resultado = require("../models/resultadoModel");

const registrarResultado = async (datos) => {
  try {
    const resultado = new Resultado({
      idMuestra: datos.idMuestra, // ID ingresado manualmente
      pH: datos.pH,
      turbidez: datos.turbidez,
      oxigenoDisuelto: datos.oxigenoDisuelto,
      nitratos: datos.nitratos,
      fosfatos: datos.fosfatos,
      cedulaLaboratorista: datos.cedula,  
      nombreLaboratorista: datos.nombreLaboratorista 
    });

    await resultado.save();
    return resultado;
  } catch (error) {
    throw new Error("Error al registrar el resultado: " + error.message);
  }
};

module.exports = { registrarResultado };
