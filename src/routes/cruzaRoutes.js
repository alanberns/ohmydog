const express = require('express');
const cruzaController = require('../controllers/cruzaController');
const permisos = require('../helpers/permisos')


router = express.Router();


router.get('/', permisos.isAuth, cruzaController.index);

module.exports = router;