const db = require('../models/adopcionDB');
const validaciones = require('../helpers/validaciones');
const mailer = require('../../mail');
const NotFoundError = require('../helpers/errors/NotFoundError');


module.exports = {
    index: async (req,res) => {
        /*
        1 listar adopciones en estado "Activo"
        2 pasar la variable adopciones a la vista
        3 chequear permiso de cliente para acceder a la ruta(adopcionesRouter)
        */
        if(req.query.e){
            var error = "ID inválida";
        }
        else{
            var error = null;
        }
        estado = "Activo";
        var adopciones = await db.buscarByEstado(estado);
        if (adopciones.length === 0){
            adopciones = null;
        }
        res.render('adopciones/index', { 
            title: 'Adopciones',
            message: 'Inicio adopciones',
            adopciones: adopciones,
            error:error,
            estado: estado
         });
    },

    registrarGet: async (req,res) => {
        /*
        1 chequear permiso de cliente para acceder a la ruta(adopcionesRoutes)
        2 obtener datos de la adopcion a registrar y el cliente que la realiza
        */
        var adopcion = {
            nombre: "",
            edad: "",
            raza: "",
            color: "",
            sexo: "",
            observaciones: "",
            origen: "",
            clienteId: req.session.usuario
        }
        console.log(req.session)
        res.render('adopciones/nuevaAdopcion', {
            title: 'Publicar adopcion',
            message: 'Publicar adopcion',
            adopcion: adopcion
        });
    },

    registrarPost: async (req,res) => {
        /*
        1 chequear permiso de cliente para acceder a la ruta(adopciones/nuevo)
        2 validar datos de entrada
        3 si pasa la validacion redirect a adopciones y registrar el alta
        4 si no pasa la validacion volver a enviar los datos a la vista registro(render)
        y enviar el error.
        */
        var newAdopcion = {
            nombre: req.body.nombre,
            edad: req.body.edad,
            raza: req.body.raza,
            color: req.body.color,
            sexo: req.body.sexo,
            observaciones: req.body.observaciones,
            origen: req.body.origen,
            estado: "Activo",
            clienteId: req.session.usuario  
        }
        // 2 helpers.validaciones.js 
        var result = validaciones.validarNuevaAdopcion(newAdopcion);
        if (result != "valido"){

            //validacion fallida
            // 4 volver a registro con los datos ingresados
            res.render('adopciones/nuevaAdopcion', {
                title: 'Publicar adopcion',
                message: 'Publicar adopcion',
                adopcion: newAdopcion,
                error: result
            });
        }
        else{
            // 3 dar el alta en la BD
            await db.agregarAdopcion(newAdopcion);
            
            res.render('exito', {
                title: "Éxito",
                message: "Éxito",
                info: "La publicacion se registró con éxito"
            });
        }
    },

    verAdopcion: async (req,res,next) => {
        /*
        1 obtener id del parametro. validar
        2 buscar id en la BBDD
        3 devolver los datos
        */
        // 1
        var id = req.params.id;
        var idAdopcion = parseInt(id);
        if (isNaN(idAdopcion)){
            res.redirect('/adopciones?e=u');
        }
        else{
            // 2 validar que existe el adopcion
            var adopcion = await db.buscarAdopcionById(idAdopcion);
            if (adopcion == null){
                try{
                    throw new NotFoundError();
                }
                catch(err){
                    next(err);
                }
            }
            // 3
            else{
                res.render('adopciones/adopcion', {
                    title: 'Adopción', 
                    message: 'Adopción',
                    adopcion: adopcion
                });
            }
        }
    },

    buscarPorEstado: async (req,res) => {
        /*
        1 Obtener el estado que se busca
        */
        var adopciones = await db.buscarByEstado(req.body.estado);
        if (adopciones.length === 0){
            adopciones = null;
        }
        console.log(req.body.estado)
        res.render('adopciones/index', { 
            title: 'Adopciones',
            message: 'Inicio adopciones',
            adopciones: adopciones,
            estado: req.body.estado
         });
    },

    confirmarAdopcion: async (req,res) => {
        /*
        obtener id del dueño de la publi
        obtener id de la publi
        db.confirmarAdopcion(adopcion) -> estado="Adoptado"
        */
    }
}