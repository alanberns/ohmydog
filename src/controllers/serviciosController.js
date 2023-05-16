const db = require('../models/servicioDB');
const validaciones = require('../helpers/validaciones');
const mailer = require('../../mail');
const NotFoundError = require('../helpers/errors/NotFoundError');


module.exports = {
    index: async (req,res) => {
        /*
        1 buscar servicios en estado "publicado"
        */
        if(req.query.i){
            var info= "Servicio solicitado exitosamente";
        }
        else{
            var info = null;
        }
        res.render('servicios/index', {
            title: "Servicios",
            message: "Servicios",
            info: info
        });
    },

    registrarServGet: async (req,res) => {
        /*
        Acceso publico
        */
        var servicio = {
            servicio: "",
            nombre: "",
            apellido: "",
            zona: "",
            horario: "",
            email_contacto: ""
        }
        res.render('servicios/nuevoServicio', {
            title: 'Publicar servicio',
            message: 'Publicar servicio',
            servicio: servicio
        });
    },

    registrarServPost: async (req,res) => {
        /*
        1 acceso publico
        2 validar datos de entrada
        3 si pasa la validacion redirect a servicios ,registrar el alta
        4 si no pasa la validacion volver a enviar los datos a la vista registro(render)
        y enviar el error.
        */
        var newServicio = {
            servicio: req.body.servicio,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            zona: req.body.zona,
            horario: req.body.horario,
            email_contacto: req.body.email_contacto,
            estado: "Solicitado"
        }
        // 2 helpers.validaciones.js validaciones.nombre, dni, telefono. email apellido. obtener error
        var result = validaciones.validarNuevoServicio(newServicio);
        if (result != "valido"){
            
            //validacion fallida
            // 4 volver a registro con los datos ingresados
            res.render('servicios/nuevoServicio', {
                title: 'Publicar servicio',
                message: 'Publicar servicio',
                servicio: newServicio,
                error: result
            });
        }
        else { 
            //validacion exitosa, validar que no exista un servicio con ese nombre para esa persona
            console.log(await db.existeServicio(newServicio))
            if (await db.existeServicio(newServicio)){
                res.render('servicios/nuevoServicio', {
                    title: 'Publicar servicio',
                    message: 'Publicar servicio',
                    servicio: newServicio,
                    error: "El servicio ya está registrado para esa persona",
                });
            }
            else{
                // agregar servicio
                db.agregarServicio(newServicio);
                res.redirect('/servicios?i=u');
            };
        }
        
    },
}