const AuthError = require('./errors/authError');

module.exports = {
    isAuth: function isAuth(){
        throw new AuthError();
    }
}



/* helper. 

const permisos = require('../helpers/permisos');
ruta('/miPerfil'), llamada a funcion(permisos.isAuth), (req,res) 

en rutas, ej clienteRoutes
*/