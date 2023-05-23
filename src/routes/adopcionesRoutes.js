const express = require('express');
const adopcionesController = require('../controllers/adopcionesController');
const permisos = require('../helpers/permisos');

router = express.Router();

router.get('/', adopcionesController.index);
router.get('/nuevo', permisos.isAuth, adopcionesController.registrarGet);
router.post('/nuevo', permisos.isAuth, adopcionesController.registrarPost);
router.get('/ver/:id', adopcionesController.verAdopcion);
router.post('/', adopcionesController.buscarPorEstado);
router.get('/misPublicaciones',  permisos.isAuth, adopcionesController.misPublicaciones);
router.get('/confirmar/:id', permisos.isAuth, adopcionesController.confirmarAdopcion);
router.post('/contactar', adopcionesController.contactarAdopcion);


module.exports = router;