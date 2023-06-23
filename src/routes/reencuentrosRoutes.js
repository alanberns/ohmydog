const express = require('express');
const reencuentrosController = require('../controllers/reencuentrosController');
const permisos = require('../helpers/permisos');

router = express.Router();

router.get('/', reencuentrosController.index);
router.get('/nuevo', reencuentrosController.nuevoGet);
router.post('/nuevo', reencuentrosController.nuevoPost);


module.exports = router;