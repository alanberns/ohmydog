const express = require('express');
const perrosController = require('../controllers/perrosController');
const permisos = require('../helpers/permisos');
const path = require('path');
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname,'../../public/img/perros/' ))
    },
    filename: function (req, file, cb) {
      cb(null, "nuevo"+"."+file.originalname.slice((file.originalname.lastIndexOf(".") - 1 >>> 0) + 2))
    }
  });
  
  const upload = multer({ storage: storage })


router = express.Router();

router.get('/',  permisos.esAdmin, perrosController.index);
router.get('/registrar/:id', permisos.esAdmin, perrosController.registrarGet);
router.post('/registrar', permisos.esAdmin, perrosController.registrarPost);
router.post('/', permisos.esAdmin, perrosController.busqueda);
router.get('/ver/:id', permisos.esAdmin, perrosController.verPerro);
router.get('/:id/modificar', permisos.esAdmin, perrosController.modificarPerroGet);
router.post('/:id/modificar', permisos.esAdmin, perrosController.modificarPerroPost);
router.get('/:id/agregarFoto', permisos.esAdmin, perrosController.agregarFotoGet);
router.post('/:id/agregarFoto', upload.single('link_foto'), permisos.esAdmin, perrosController.agregarFotoPost);

module.exports = router;