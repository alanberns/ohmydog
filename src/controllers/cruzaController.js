const db = require('../models/cruzaDB');
const db_perros = require('../models/perroDB');
const validaciones = require('../helpers/validaciones');
const mailer = require('../../mail');
const NotFoundError = require('../helpers/errors/NotFoundError');


module.exports = {
    index: async (req,res) => {
        /*
        1 enviar el cartel de informacion rojo
        */
        var mascotasCliente = await db.mascotasCliente(req.session.usuario);
        console.log(mascotasCliente)
        res.render('cruza/index',{
        title: 'Cruza',
        message: 'Cruza de perros',
        error: "Tener cachorros es una enorme responsabilidad, hay muchos perros que aún buscan un hogar",
        cliente: mascotasCliente
       })
    },

    cruzar: async (req,res,next) => {
        /*
        1 obtener id del perro
        2 dar formulario para completar (sexo y celo)
        */
        var perroId = parseInt(req.params.id);
        if (isNaN(perroId)){
            res.redirect('/cruza');
        }
        else{
            // verificar que el id esta registrado en la bd
            var perro = await db_perros.buscarPerroById(perroId);
            if (perro == null){
                try{
                    throw new NotFoundError();
                }
                catch(err){
                    next(err);
                }
            }
            else{
                res.render("cruza/formulario",{
                    title: 'Cruza',
                    message: 'Completa los datos para cruzar a tu mascota',
                    perro: perro
                })
            }
        }
    },

    cruzarConfirmar: async (req,res) => {
        /*
        1 obtener id del perro
        2 guardar en la bd
        3 redirect a index o a exito
        */
        var perroId = parseInt(req.body.id);
        var cruza = {
            periodo_celo: req.body.celo,
            sexo: req.body.sexo,
            perroId: perroId
        }
        await db.agregarCruza(cruza);
        res.render("exito",{
            title: 'Éxito',
            message: 'Éxito',
            info: 'Tu mascota estará disponible para cruza'
        })
    }
}