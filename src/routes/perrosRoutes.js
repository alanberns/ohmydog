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

router.get('/', perrosController.index);
router.get('/registrar/:id',perrosController.registrarGet);
router.post('/registrar',perrosController.registrarPost);
router.post('/',perrosController.busqueda);
router.get('/:id',perrosController.verPerro);
router.get('/:id/modificar',perrosController.modificarPerroGet);
router.post('/:id/modificar',perrosController.modificarPerroPost);
router.get('/:id/agregarFoto',perrosController.agregarFotoGet);
router.post('/:id/agregarFoto', upload.single('link_foto'),perrosController.agregarFotoPost);

module.exports = router;