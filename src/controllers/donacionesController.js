const db = require('../models/publicacionDonacionesDB');
const db_donaciones = require('../models/donacionesDB');
const db_cliente = require('../models/clienteDB');
const validaciones = require('../helpers/validaciones');
const NotFoundError = require('../helpers/errors/NotFoundError');


module.exports = {
    index: async (req,res) => {
        /*
        1 obtener la lista de donaciones
        2 filtrar las donaciones con fecha de fin posteriores al dia actual
        */
        var error = null;
        if(req.query.e){
            var error = "ID inválida";
        }
        var hoy = new Date(Date.now());
        var donaciones = await db.listarDonacionesActivas(hoy);

        if (donaciones.length == 0){
            donaciones = null
        }
        res.render('donaciones/index',{
            title: 'Donaciones',
            message: 'Campañas de donación',
            donaciones: donaciones,
            activas: true,
            error: error
        });
    },

    registrarGet: async (req,res) => {
        /*
        1 enviar el formato de objeto a la ruta
        */
        let hoy = new Date();
        let DIA_EN_MILISEGUNDOS = 24 * 60 * 60 * 1000;
        let mañana_date = new Date(hoy.getTime() + DIA_EN_MILISEGUNDOS);
        let mañana = mañana_date.toISOString().slice(0, 10);
        var donacion = {
            nombre: "",
            monto: 0,
            fecha_fin: null,
        }
        res.render('donaciones/nuevo', {
            title: "Nueva donación",
            message: "Nueva Donación",
            donacion: donacion,
            mañana: mañana
        });
    },

    registrarPost: async (req, res) => {
        /*
        1 obtener datos de entrada
        2 validar datos de entrada
        3 si pasa la validacion dar el alta
        4 si no pasa la validacion volver a enviar los datos a la vista registro(render)
        y enviar el error.
        */
        // 1
        var newDonacion = {
            nombre: req.body.nombre,
            monto: parseInt(req.body.monto),
            fecha_fin: req.body.fecha_fin,
            monto_actual: 0,
            fecha_inicio: new Date(Date.now())
        }

        // 2
        var result = validaciones.validarNuevaDonacion(newDonacion);
        if (result != "valido"){
            
            //validacion fallida
            // 4 volver a registro con los datos ingresados
            res.render('donaciones/nuevo', {
                title: 'Nueva donacion',
                message: 'Nueva donacion',
                donacion: newDonacion,
                error: result
            });
        }
        else {
            //validacion exitosa, validar que no exista el nombre
            if (await db.existeDonacion(newDonacion)){
                res.render('donaciones/nuevo', {
                    title: 'Nueva donacion',
                    message: 'Nueva donacion',
                    donacion: newDonacion,
                    error: "Ya existe una campaña de donación  registrada con el nombre ingresado"
                });
            }
            else{
                //agregar donacion
                newDonacion.fecha_fin = new Date(newDonacion.fecha_fin);
                await db.agregarDonacion(newDonacion);
                res.render('exito', {
                    title: 'Éxito',
                    message: 'Éxito',
                    info: 'Campaña de donación creada'
                });
            }
        }
    },

    donarGet: async (req, res, next) => {
        /*
        1 obtener el id de la donacion y el id del cliente
        2 enviar la informacion de la donacion a la ruta
        */
        var id = req.params.id;
        var publicacionDonacionId = parseInt(id);
        if (isNaN(publicacionDonacionId)){
            res.redirect('/donaciones?e=u');
        }
        else{
            // 2 validar que existe la publicacion de donacion
            var donacion = await db.buscarDonacionById(publicacionDonacionId);
            if (donacion == null){
                try{
                    throw new NotFoundError();
                }
                catch(err){
                    next(err);
                }
            }
            else{
                res.render('donaciones/donacion',{
                    title: "Donar",
                    message: "Donar",
                    donacion: donacion
                })
            }
        }
    },

    confirmarDonacion: async (req, res)=> {
        /*
        1 mostrar "alias" de la vet y el monto a confirmar
        */
        var tarjeta = {
            numero_tarjeta : null,
            nombre_tarjeta : "",
            codigo : null,
            vencimiento: null
        }
        var datos = {
            alias: "ohmydog.veterinaria",
            nombre: "OhMyDog Veterinaria",
            monto: req.body.monto_donacion,
            id: req.body.id,
            nombre_donacion: req.body.nombre
        }
        res.render('donaciones/confirmar',{
            title: "Confirmar donación",
            message: "Confirmar donacion",
            datos: datos,
            tarjeta: tarjeta,
            mesActual: new Date().toISOString().slice(0, 7)
        })
    },

    donarPost: async (req, res) => {
        /*
        0 validar tarjeta
        1 Obtener id de la donacion, id del cliente y el monto
        2 sumar el monto donado al monto actual de la donacion
        3 calcular el 20% para sumar a favor del cliente
        4 registrar la donacion en la tabla donaciones
        */
        var tarjeta = {
            numero_tarjeta : parseInt(req.body.numero_tarjeta),
            nombre_tarjeta : req.body.nombre_tarjeta,
            codigo : parseInt(req.body.codigo),
            vencimiento : req.body.vencimiento
        }
        console.log(tarjeta.codigo)
        var result = validaciones.validarTarjeta(tarjeta);
        if ( result != "valido"){
            var datos = {
                alias: "ohmydog.veterinaria",
                nombre: "OhMyDog Veterinaria",
                monto: req.body.monto_donacion,
                id: req.body.id,
                nombre_donacion: req.body.nombre
            }
            res.render('donaciones/confirmar',{
                title: "Confirmar donación",
                message: "Confirmar donacion",
                datos: datos,
                tarjeta: tarjeta,
                error: result
            })
        }
        else{
            var donacionId = req.body.id;
            var monto_donacion = parseInt(req.body.monto_donacion);
            var clienteId = req.session.usuario;
            var beneficio = monto_donacion * 0.2;
    
            await db.sumarMontoDonacion(donacionId,monto_donacion);
            await db_cliente.sumarMontoDescuento(clienteId,beneficio);
    
            var newDonacion = {
                monto: monto_donacion,
                fecha: new Date(Date.now()),
                clienteId: clienteId,
                donacionId: donacionId
            }
            await db_donaciones.registrarDonacion(newDonacion);
    
            res.render('exito',{
                title: 'Éxito',
                message: 'Donación exitosa',
                info: "Donaste $"+monto_donacion+" y te otorgamos un descuento de $"+beneficio+" para usar en tu próxima atención"
            });
        }
    },

    historialCampaña: async (req,res,next) => {
        /*
        1 obtener id de la campaña y validar
        2 obtener las donaciones realizadas a la campaña
        */
        var publicacion_donacion_id = req.params.id;
        if (isNaN(publicacion_donacion_id)){
            res.redirect('/donaciones?e=u');
        }
        else{
            var donacion = await db.buscarDonacionById(publicacion_donacion_id);
            if (donacion == null){
                try{
                    throw new NotFoundError();
                }
                catch(err){
                    next(err);
                }
            }
            else{
                var donantes = await db_donaciones.obtenerDonantes(publicacion_donacion_id);
                res.render('donaciones/historialDonacion',{
                    title: 'Donaciones',
                    message: 'Donaciones realizadas a la campaña '+donacion.nombre,
                    donaciones: donantes
                });
            }
        }
    }
}