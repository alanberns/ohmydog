const AuthError = require('./errors/authError');

module.exports = {
    isAuth: function isAuth(){
        throw new AuthError();
    },
    
    esCliente: function esCliente(req, res, next){
        if(req.session.nivel == 1) next();
        else throw new AuthError();
    },

    esAdmin: function esAdmin(req, res, next){
        if(req.session.nivel == 2) next();
        else throw new AuthError();
    }
}



/* helper. 

const permisos = require('../helpers/permisos');
ruta('/miPerfil'), llamada a funcion(permisos.isAuth), (req,res) 

en rutas, ej clienteRoutes
*/