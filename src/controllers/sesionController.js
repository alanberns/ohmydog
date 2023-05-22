const db = require('../models/sesionDB');

module.exports = {
    iniciar: async (req,res) => {
        res.render('sesion/iniciar', {
            title: 'OhMyDog | Iniciar Sesión',
            message: 'Iniciar Sesión',
            datos: req.query,
            usuario: req.session
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
            res.render('index', {
                title: 'OhMyDog',
                message: 'Inicio',
                usuario: req.session
            });
        }else{
            sesion = await db.intentoAdmin(req.body);
            if(sesion.length == 1){
                sesion = sesion.pop();
                req.session.nivel = 2;
                req.session.usuario = sesion.id;
                req.session.nombre = sesion.nombre;
                req.session.apellido = sesion.apellido;
                res.render('index', {
                    title: 'OhMyDog',
                    message: 'Inicio',
                    usuario: req.session
                });
            }else{
                req.session.nivel = 0;
                req.session.nombre = "";
                req.session.apellido = "";
                res.render('sesion/iniciar', {
                    title: 'OhMyDog',
                    message: 'Iniciar Sesion',
                    datos: req.body,
                    usuario: req.session
                });
            }
        }
    },

    cerrar: async (req,res) => {
        req.session.destroy();
        var usuario = [];
        res.render('index', {
            title: 'OhMyDog',
            message: 'Inicio',
            usuario: usuario
        });
    }
}