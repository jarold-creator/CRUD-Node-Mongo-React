const express = require('express')
const router = express.Router();
const path = require("path");
const productoController = require('../controller/productoControlller')

/**rutas modulo productos */
router.post('/', productoController.agregarProducto);
router.get('/', productoController.buscarProducto);
router.get('/:id', productoController.buscarProductoPorId);
router.put('/:id', productoController.actualizarProducto);
router.delete('/:id', productoController.eliminarClientePorId);

module.exports = router;