/**importamos el modelo Usuarios */
const Usuarios = require('../models/Usuarios');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {

  /**revisamos la validacion para ver si tenemos errores */
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  const { email, password } = req.body;  

  try {

    /**verficamos que el usuario registrado sea unico */
    let usuario = await Usuarios.findOne({ email });

    if (usuario) {
      return res.status(400).json({ message: "el usuario ya existe" });
    }

    usuario = new Usuarios(req.body);
    usuario.password = await bcryptjs.hash(password, 10);

    /**guardamos el usuario en DB */
    await usuario.save();

    /**firmamos */
    const payload = {
      usuario: { id: usuario.id }
    };

    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600
      },
      (error, token) => {
        if (error) throw error;
        /**mensaje confirmacion */
        res.json({ token });
      });

  } catch (error) {
    console.log("hay un error");
    console.log(error.message);
    res.status(400).send("hubo un error al crear usuario");
  }
}