const forbbidenError = require('./errors/forbbidenError');
const authError = require('./errors/authError');

module.exports = {
    isAuth: function isAuth(req, res, next){
        if (!req.session.nombre) throw new authError();
        else next();
    },
    
    esCliente: function esCliente(req, res, next){
        if(req.session.nivel == 1) next();
        else throw new forbbidenError();
    },

    esAdmin: function esAdmin(req, res, next){
        if(req.session.nivel == 2) next();
        else throw new forbbidenError();
    }
}



/* helper. 

const permisos = require('../helpers/permisos');
ruta('/miPerfil'), llamada a funcion(permisos.isAuth), (req,res) 

en rutas, ej clienteRoutes
*/