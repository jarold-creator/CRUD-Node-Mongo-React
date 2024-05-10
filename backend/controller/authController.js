/**importamos el modelo Usuarios */
const Usuarios = require('../models/Usuarios');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


/**funcion autenticar usuario */
exports.autenticarUsuario = async (req, res) => {

  /**revisamos la validacion para ver si tenemos errores */
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  const { email, password } = req.body; 
  

  try {

    /**verficar si el usuario esta registrado */
    let usuario = await Usuarios.findOne({ email });

    if (!usuario) {
      return res.status(400).json({ message: "el usuario no existe" });
    }

    /**verficar si el usuario esta registrado */
    let passwordOk = await bcryptjs.compare(password, usuario.password);

    if (!passwordOk) {
      return res.status(400).json({ message: "contraseña no valida" });
    }

    /**si es correcto se crea y se firma el token*/
    const payload = {
      usuario: { id: usuario.id }
    };

    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 43200
      },
      (error, token) => {
        if (error) throw error;
        /**mensaje confirmacion */
        res.json({ token });
      });

  } catch (error) {
    console.log("hay un error");
    console.log(error.message);
    res.status(400).send("hubo un error en autenticar usuario");
  }
  
}

/**funcion cuando el usuario esta autenticado */
exports.usuarioAutenticado = async (req, res) => {
  try {
    let usuario = await Usuarios.findById(req.usuario.id);
    res.json({ usuario });
  } catch (error) {
    res.status(500).json({ message: "Hubo un error" });
  }
}