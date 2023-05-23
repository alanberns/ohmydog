const db = require('../models/usuarioDB');
const db_perros = require('../models/perroDB');


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
}