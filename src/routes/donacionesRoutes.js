const express = require('express');
const donacionesController = require('../controllers/donacionesController');
const permisos = require('../helpers/permisos')


router = express.Router();


router.get('/', permisos.isAuth, donacionesController.index);
router.get('/nuevo', permisos.esAdmin, donacionesController.registrarGet);
router.post('/nuevo', permisos.esAdmin, donacionesController.registrarPost);
router.get('/donar/:id', permisos.esCliente, donacionesController.donarGet);
router.post('/donar/:id', permisos.esCliente, donacionesController.donarPost);
router.post('/donar/:id/confirmarDonacion', permisos.esCliente, donacionesController.confirmarDonacion);
router.get('/historial/:id',donacionesController.historialCampaña);

module.exports = router;