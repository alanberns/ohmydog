const db = require('../models/donacionesDB');
const db_cliente = require('../models/clienteDB');
const validaciones = require('../helpers/validaciones');


module.exports = {
    index: async (req,res) => {
        /*
        1 obtener la lista de donaciones
        2 filtrar las donaciones con fecha de fin posteriores al dia actual
        */
        var hoy = new Date(Date.now());
        var donaciones = await db.listarDonacionesActivas(hoy);

        if (donaciones.length == 0){
            donaciones = null
        }
        res.render('donaciones/index',{
            title: 'Donaciones',
            message: 'Campañas de donación',
            donaciones: donaciones,
            activas: true
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
                    error: "El nombre de la donación ya está en uso"
                });
            }
            else{
                //agregar donacion
                newDonacion.fecha_fin = new Date(newDonacion.fecha_fin);
                await db.agregarDonacion(newDonacion);
                res.render('exito', {
                    title: 'Éxito',
                    message: 'Éxito',
                    info: 'Donación registrada'
                });
            }
        }
    },

    donarGet: async (req, res) => {
        /*
        1 obtener el id de la donacion
        2 enviar la informacion de la donacion a la ruta
        */
        var donacion = await db.buscarDonacionById(req.params.id);
        res.render('donaciones/donacion',{
            title: "Donar",
            message: "Donar",
            donacion: donacion
        })
    },

    confirmarDonacion: async (req, res)=> {
        /*
        1 mostrar "alias" de la vet y el monto a confirmar
        */
        console.log(req.body)
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
            datos: datos
        })
    },

    donarPost: async (req, res) => {
        /*
        1 Obtener id de la donacion, id del cliente y el monto
        2 sumar el monto donado al monto actual de la donacion
        3 calcular el 20% para sumar a favor del cliente
        */
        var donacionId = req.body.id;
        var monto_donacion = parseInt(req.body.monto_donacion);
        var clienteId = req.session.usuario;
        var beneficio = monto_donacion * 0.2;

        await db.sumarMontoDonacion(donacionId,monto_donacion);
        await db_cliente.sumarMontoDescuento(clienteId,beneficio);

        res.render('exito',{
            title: 'Éxito',
            message: 'Donación exitosa',
            info: "Donaste $"+monto_donacion+" y te otorgamos un descuento de $"+beneficio+" para usar en tu próxima atención"
        });
    }
}