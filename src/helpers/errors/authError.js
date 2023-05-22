class AuthError extends Error {
    constructor() {
        super("No tienes permitido acceder a esta página");

        this.name = "Error de Autenticación";
        this.status = 403;
    }

    toJson(){
        return {
            name: this.name,
            status: this.status,
            message: this.message,
        }
    }
}

module.exports = AuthError;

/* error personalizado

const AuthError = require('./errors/authError');
throw new AuthError(); tira el error. 

lo tendra que hacer el helper que corresponda al chequear algo 
(ej permisos en isAuth)
*/