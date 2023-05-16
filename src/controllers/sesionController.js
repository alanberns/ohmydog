const db = require('../models/sesionDB');

module.exports = {
    iniciar: async (req,res) => {
        res.render('iniciar', { title: 'OhMyDog', message: 'Iniciar Sesion' });
    },

    intento: async (req,res) => {
        var sesion = await db.intentoCliente(req.body);
        if(sesion.lenght == 1){
            req.session.nivel = 1;
            req.session.id = sesion.id;
            req.session.nombre = sesion.nombre;
            res.render('home', { title: 'OhMyDog', message: 'Inicio' });
        }else{
            sesion = await db.intentoAdmin(req.body);
            if(sesion.lenght == 1){
                req.session.nivel = 2;
                req.session.id = sesion.id;
                req.session.nombre = sesion.nombre;
                res.render('home', { title: 'OhMyDog', message: 'Inicio' });
            }else{
                req.session.nivel = 0;
                res.render('iniciar', { title: 'OhMyDog', message: 'Iniciar Sesion', datos: req.body });
            }
        }
    },

    cerrar: async (req,res) => {
        req.session.destroy();
        res.render('home', { title: 'OhMyDog', message: 'Inicio' });
    }
}