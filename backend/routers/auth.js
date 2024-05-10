const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const { check } = require("express-validator");
const auth = require('../midlewares/authMidlewares');


/**autenticar el usuario 
 * api/usuarios
*/

router.post("/", [
    check("email", "agrega un email valido").isEmail(),
    check("password", "ingresa un password minimo de 10 caracteres").isLength({ min:10 })
], authController.autenticarUsuario);

router.get("/", auth, authController.usuarioAutenticado);

module.exports = router;