const express = require('express');
const router = express.Router();
const clienteController = require('../controller/clienteController');
const path = require("path");

/**rutas */
router.get('/', clienteController.buscarClientes);
router.get('/:id', clienteController.buscarClientePorId);
router.post('/', clienteController.agregarClientes);
router.delete('/:id', clienteController.eliminarClientePorId);
router.put('/:id', clienteController.actualizarCliente);

module.exports = router;