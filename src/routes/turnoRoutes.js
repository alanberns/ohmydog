const express = require('express');
const turnoController = require('../controllers/turnoController');
const permisos = require('../helpers/permisos');

router = express.Router();

router.get('/solicitar', permisos.esCliente, turnoController.solicitar);

module.exports = router;