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
    },

    buscarPerrosCruza: async (req,res,next) => {
        /*
        1 obtener id del cliente, id del perro 
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
                var clienteId = req.session.usuario;
                var cruza = await db.buscarPublicacionCruza(perroId);
                var infoCruza = {
                    raza: cruza.perro.raza,
                    clienteId: clienteId,
                    cruza:{
                        sexo: cruza.sexo
                    }
                }
                var perrosCompatibles = await db.buscarPerrosCompatibles(infoCruza);
                res.render('cruza/busqueda',{
                    title: 'Cruza',
                    message: 'Perros compatibles con tu mascota para cruza',
                    info: 'Resultados de la busqueda',
                    perros: perrosCompatibles
                })
            }
        }
    },

    contactar: async (req,res) => {
        /*
        1 obtener id del perro
        2 buscar el perro y dueño
        3 obtener el email del dueño y perro
        4 obtener datos del que quiere contactarse
        */
        var perroId = req.body.perroId;
        var perro = await db_perros.buscarPerroById(perroId);
        var nombreEmisor = req.session.nombre;
        var emailEmisor = req.session.email;
        var email_contacto = perro.cliente.email;
        var mensaje = "Hola, "+nombreEmisor+" quiere contactarse con vos, su email es: "+
        emailEmisor+" por tu anuncio en OhMyDog: Cruza de: "+perro.nombre;
        console.log(mensaje);
        mailer.sendMail(email_contacto,"Quieren contactarte",mensaje)
        res.render('exito', {
            title: "Éxito",
            message: "Contacto realizado",
            info: "Enviamos tu email para que se contacten con vos"
        })
    }
}