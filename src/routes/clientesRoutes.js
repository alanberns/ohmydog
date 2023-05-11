const express = require('express');
const clientesController = require('../controllers/clientesController');
const permisos = require('../helpers/permisos')


router = express.Router();

router.get('/', clientesController.index);
router.get('/registrar',clientesController.registrarGet);
router.post('/registrar',clientesController.registrarPost);
router.post('/',clientesController.busqueda);

module.exports = router;