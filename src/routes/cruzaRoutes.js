const express = require('express');
const cruzaController = require('../controllers/cruzaController');
const permisos = require('../helpers/permisos')


router = express.Router();


router.get('/', permisos.isAuth, cruzaController.index);
router.get('/cruzar/:id', cruzaController.cruzar);
router.post('/cruzar/ok', cruzaController.cruzarConfirmar);
router.get('/buscar/:id', cruzaController.buscarPerrosCruza);
router.post('/contactar', cruzaController.contactar);

module.exports = router;