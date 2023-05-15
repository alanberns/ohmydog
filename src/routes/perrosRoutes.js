const express = require('express');
const perrosController = require('../controllers/perrosController');
const permisos = require('../helpers/permisos');


router = express.Router();

router.get('/', perrosController.index);
router.get('/registrar/:id',perrosController.registrarGet);
router.post('/registrar',perrosController.registrarPost);
router.post('/',perrosController.busqueda);
router.get('/:id',perrosController.verPerro);

module.exports = router;