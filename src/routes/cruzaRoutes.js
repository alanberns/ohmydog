const express = require('express');
const cruzaController = require('../controllers/cruzaController');
const permisos = require('../helpers/permisos')


router = express.Router();


router.get('/', permisos.isAuth, cruzaController.index);
router.get('/cruzar/:id', permisos.esCliente, cruzaController.cruzar);
router.post('/cruzar/ok', permisos.esCliente, cruzaController.cruzarConfirmar);
router.get('/buscar/:id', permisos.esCliente, cruzaController.buscarPerrosCruza);
router.post('/contactar', permisos.esCliente, cruzaController.contactar);

module.exports = router;