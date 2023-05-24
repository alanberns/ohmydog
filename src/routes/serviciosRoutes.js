const express = require('express');
const serviciosController = require('../controllers/serviciosController');
const permisos = require('../helpers/permisos');

router = express.Router();

router.get('/', serviciosController.index);
router.get('/nuevo', permisos.esAdmin, serviciosController.registrarServGet);
router.post('/nuevo', permisos.esAdmin, serviciosController.registrarServPost);
router.get('/ver/:id',serviciosController.verServicio);
router.post('/contactar',serviciosController.contactarServicio);

module.exports = router;