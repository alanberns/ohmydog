const express = require('express');
const sesionController = require('../controllers/sesionController');
const permisos = require('../helpers/permisos')

router = express.Router();

router.get('/iniciar', sesionController.iniciar);
router.post('/intento', sesionController.intento);
router.get('/cerrar', sesionController.cerrar);

module.exports = router;