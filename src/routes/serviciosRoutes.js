const express = require('express');
const serviciosController = require('../controllers/serviciosController');
const permisos = require('../helpers/permisos');

router = express.Router();

router.get('/', serviciosController.index);
router.get('/nuevo',serviciosController.registrarServGet);
router.post('/nuevo',serviciosController.registrarServPost);

module.exports = router;