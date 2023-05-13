const db = require('../models/perroDB');
const db_clientes = require('../models/clienteDB');
const validaciones = require('../helpers/validaciones');

module.exports = {
    index: async (req,res) => {
        /*
        1 listar perros
        */
        var perros = await db.listarPerros();
        if(perros.length === 0){
            perros = null
        }
        res.render('perros/index', {
            title: "Mascotas",
            message: "Mascotas",
            perros: perros
        });
    },

    registrarGet: async (req,res) => {
        /*
        1 chequear permiso de admin para acceder a la ruta(perrosRoutes)
        2 obtener datos del cliente al que se le registrara la mascota
        */
        var perro = {
            nombre: "",
            raza: "",
            observaciones: "",
            color: "",
            fecha_nacimiento: null,
            id_cliente: parseInt(req.params.id)
        }
        var cliente = await db_clientes.buscarClienteById(perro.id_cliente);
        res.render('perros/registrar', {
            title: 'Registrar perro',
            message: 'Registrar perro',
            perro: perro,
            cliente: cliente
        });
    },

    registrarPost: async (req,res) => {
        /*
        1 chequear permiso de admin para acceder a la ruta(perrosRoutes)
        2 validar datos de entrada
        3 si pasa la validacion redirect a perros y registrar el alta
        4 si no pasa la validacion volver a enviar los datos a la vista registro(render)
        y enviar el error.
        */
       
        var cliente = await db_clientes.buscarClienteById(req.body.id_cliente);
        var newPerro = {
            nombre: req.body.nombre,
            raza: req.body.raza,
            observaciones: req.body.observaciones,
            color: req.body.color,
            fecha_nacimiento: req.body.fecha_nacimiento,
            link_foto: "",
            id_cliente: req.body.id_cliente
        }
        

        // 2 helpers.validaciones.js 
        var result = validaciones.validarNuevoPerro(newPerro);
        if (result != "valido"){
            
            //validacion fallida
            // 4 volver a registro con los datos ingresados
            res.render('perros/registrar', {
                title: 'Registrar perro',
                message: 'Registrar perro',
                perro: newPerro,
                error: result,
                cliente: cliente
            });
        }
        else {
            console.log(await db.existePerroDeCliente(newPerro));
            //validacion exitosa, validar que no exista un perro con ese nombre para el cliente
            if (await db.existePerroDeCliente(newPerro)){
                res.render('perros/registrar', {
                    title: 'Registrar perros',
                    message: 'Registrar perros',
                    perro: newPerro,
                    error: "El cliente ya tiene un perro registrado con ese nombre",
                    cliente: cliente
                });
            }
            else{
            // 3 dar el alta en la BBDD
            // fecha a Date: var fecha = new Date(newPerro.fecha_nacimiento);
            // Date a fecha: fecha.toISOString().slice(0,10)
            newPerro.fecha_nacimiento = new Date(newPerro.fecha_nacimiento);
            db.agregarPerro(newPerro);
            
            res.render('exito', {
                title: "Éxito",
                message: "Éxito",
                info: "La mascota se registró con éxito"
            });
            }
        }
    },

    busqueda: async (req,res) => {
        /*
        1 validar busqueda
        2 hacer busqueda
        3 enviar busqueda a template
        */
        //1 validaciones.validarBusquedaNombre(nombre); enviar error si no valida
        var nombre = req.body.nombre;
        var result = validaciones.validarBusquedaPerro(nombre);
        if (result != "válido"){
            res.render('perros/index', {
                title: "Mascotas",
                message: "Mascotas",
                perros: null,
                error: result
            })
        }
        else{
            //2 buscar en la bd
            var perros = await db.buscarPerro(nombre);
            if (perros.length === 0){
                perros = null;
            }
            //3 render basico
            res.render('perros/index', {
                title: 'Mascotas', 
                message: 'Mascotas',
                perros: perros,
                info: "Resultados de la busqueda",
                nombre: nombre,
            });
        }
    }
}