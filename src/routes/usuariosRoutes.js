const express = require('express');
const usuariosController = require('../controllers/usuariosController');
const permisos = require('../helpers/permisos');


router = express.Router();

router.get('/misMascotas', permisos.esCliente, usuariosController.misMascotas);

module.exports = router;