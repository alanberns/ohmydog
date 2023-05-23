const express = require('express');
const usuariosController = require('../controllers/usuariosController');
const permisos = require('../helpers/permisos');


router = express.Router();

router.get('/misMascotas', usuariosController.misMascotas);

module.exports = router;