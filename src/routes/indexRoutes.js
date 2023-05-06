const express = require('express');

const indexController = require('../controllers/indexController');

//esta para prueba, si despues no se utiliza hay que sacarlo
const permisos = require('../helpers/permisos')


router = express.Router();

router.get('/', indexController.index);

//esta para prueba, si despues no se utiliza hay que sacarlo
router.get('/error', permisos.isAuth, indexController.index);

module.exports = router;