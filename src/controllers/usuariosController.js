const db = require('../models/usuarioDB');
const db_perros = require('../models/perroDB');
const forbbidenError = require('../helpers/errors/forbbidenError');


module.exports = {
    misMascotas: async (req,res) => {
        /*
        1 obtener id de la session
        2 listar mascotas 
        3 
        */
       //req.session.usuario
        var clienteId = req.session.usuario;
        var clienteInfo = await db_perros.mascotasCliente(clienteId);
        var mascotas = clienteInfo.perros;
        if (mascotas.length < 1){
            res.render('usuarios/mascotas', {
                title: 'Mascotas',
                message: 'Mascotas de '+ clienteInfo.nombre,
                mascotas: null,
                error: "No se encontraron mascotas ",
            });
        }
        else{
            res.render('usuarios/mascotas', {
                title: 'Mascotas',
                message: 'Mascotas de '+ clienteInfo.nombre,
                mascotas: mascotas,
            });
        }
    },

    verPerro: async (req,res,next) => {
        /*
        1 Obtener id y validar
        */
        var id = req.params.id;
        var idPerro = parseInt(id);
        if (isNaN(idPerro)){
            res.redirect('/perros?e=u');
        }
        else{
            // verificar que el id esta registrado en la bd
            var perro = await db_perros.buscarPerroById(id);
            if (perro == null){
                try{
                    throw new NotFoundError();
                }
                catch(err){
                    next(err);
                }
            }
            else{
                // verificar que el perro es del cliente
                if(perro.cliente.email != req.session.email){
                    try{
                        throw new forbbidenError();
                    }
                    catch(err){
                        next(err);
                    }
                }
                else{
                    res.render('usuarios/perro', {
                        title: 'Mascota', 
                        message: 'Datos de la mascota',
                        perro: perro
                    });
                }
            }
        }
    },
}