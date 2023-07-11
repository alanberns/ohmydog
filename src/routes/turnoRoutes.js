const express = require('express');
const turnoController = require('../controllers/turnoController');
const permisos = require('../helpers/permisos');

router = express.Router();

router.get('/solicitar', permisos.esCliente, turnoController.solicitar);
router.post('/intento', permisos.esCliente, turnoController.intento);
router.get('/listar', permisos.esCliente, turnoController.listar);
router.get('/cancelar/:id', permisos.esCliente, turnoController.cancelar);

router.get('/listarAdmin', permisos.esAdmin, turnoController.listarAdmin);
router.post('/listarAdmin', permisos.esAdmin, turnoController.listarAdmin);
router.get('/aceptar/:id', permisos.esAdmin, turnoController.aceptar);
router.get('/rechazar/:id', permisos.esAdmin, turnoController.rechazar);
router.get('/verDetalle/:id', permisos.esAdmin, turnoController.verDetalle);
router.get('/listarAceptadosAdmin', permisos.esAdmin, turnoController.listarAceptadosAdmin);
router.post('/listarAceptadosAdmin', permisos.esAdmin, turnoController.listarAceptadosAdmin);

module.exports = router;