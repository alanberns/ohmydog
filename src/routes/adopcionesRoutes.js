const express = require('express');
const adopcionesController = require('../controllers/adopcionesController');
const permisos = require('../helpers/permisos');

router = express.Router();

router.get('/', adopcionesController.index);
router.get('/nuevo',adopcionesController.registrarGet);
router.post('/nuevo',adopcionesController.registrarPost);
router.get('/ver/:id',adopcionesController.verAdopcion);
router.post('/',adopcionesController.buscarPorEstado);
router.get('/misPublicaciones', adopcionesController.misPublicaciones);
router.get('/confirmar/:id',adopcionesController.confirmarAdopcion);
router.post('/contactar',adopcionesController.contactarAdopcion);


module.exports = router;