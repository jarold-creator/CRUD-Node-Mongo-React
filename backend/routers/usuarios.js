const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuarioController');
const { check } = require("express-validator");

/**api/usuarios */
router.post('/', [
    check("nombres", "los nombres son obligatorios").not().isEmpty(),
    check("email", "Ingresa un mail valido").isEmail(),
    check("password", "el password debe contener minimo 10 caracteres").isLength({ min:10 })
], usuarioController.crearUsuario);

module.exports = router;