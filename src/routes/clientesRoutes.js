const express = require('express');
const clientesController = require('../controllers/clientesController');
const permisos = require('../helpers/permisos')


router = express.Router();

router.get('/',  permisos.esAdmin, clientesController.index);
router.get('/registrar', permisos.esAdmin, clientesController.registrarGet);
router.post('/registrar', permisos.esAdmin, clientesController.registrarPost);
router.post('/', permisos.esAdmin, clientesController.busqueda);
router.get('/ver/:id', permisos.esAdmin, clientesController.verCliente);
router.get('/ver/:id/mascotas', permisos.esAdmin, clientesController.mascotas);

module.exports = router;