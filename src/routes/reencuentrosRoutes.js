const express = require('express');
const reencuentrosController = require('../controllers/reencuentrosController');
const permisos = require('../helpers/permisos');
const path = require('path');
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname,'../../public/img/reencuentros/' ))
    },
    filename: function (req, file, cb) {
      cb(null, "nuevo"+"."+file.originalname.slice((file.originalname.lastIndexOf(".") - 1 >>> 0) + 2))
    }
  });
  
  const upload = multer({ storage: storage })

router = express.Router();

router.get('/', reencuentrosController.index);
router.get('/nuevo', permisos.esCliente, reencuentrosController.nuevoGet);
router.post('/nuevo', permisos.esCliente, reencuentrosController.nuevoPost);
router.post('/agregarFoto/:id', upload.single('link_foto'), permisos.esCliente, reencuentrosController.agregarFoto);
router.post('/', reencuentrosController.busqueda);
router.get('/ver/:id', reencuentrosController.verPublicacion);
router.post('/contactar', reencuentrosController.contactarPublicacion);


module.exports = router;