const db = require('../models/sesionDB');
const indexController = require('../controllers/indexController');

module.exports = {
    iniciar: async (req,res) => {
        res.render('sesion/iniciar', {
            title: 'Iniciar sesión',
            message: 'Iniciar sesión',
            datos: req.query
        });
    },

    intento: async (req,res) => {
        var sesion = await db.intentoCliente(req.body);
        if(sesion.length == 1){
            sesion = sesion.pop();
            req.session.nivel = 1;
            req.session.usuario = sesion.id;
            req.session.nombre = sesion.nombre;
            req.session.apellido = sesion.apellido;
            req.session.email = sesion.email;
            /*res.render('index', {
                title: 'OhMyDog',
                message: 'Inicio'
            });*/
            indexController.index(req, res);
        }else{
            sesion = await db.intentoAdmin(req.body);
            if(sesion.length == 1){
                sesion = sesion.pop();
                req.session.nivel = 2;
                req.session.usuario = sesion.id;
                req.session.nombre = sesion.nombre;
                req.session.apellido = sesion.apellido;
                req.session.email = sesion.email;
                /*res.render('index', {
                    title: 'OhMyDog',
                    message: 'Inicio'
                });*/
                indexController.index(req, res);
            }else{
                req.session.nivel = 0;
                req.session.usuario = null;
                req.session.nombre = null;
                req.session.apellido = null;
                res.render('sesion/iniciar', {
                    title: 'Iniciar sesión',
                    message: 'Iniciar sesión',
                    datos: req.body,
                    error: "Email y/o contraseña incorrecto"
                });
            }
        }
    },

    cerrar: async (req,res) => {
        req.session.nivel = 0;
        req.session.usuario = null;
        req.session.nombre = null;
        req.session.apellido = null;
        req.session.save(function(err){
            if(err) return next(err)
            res.redirect('/');
        });
    }
}