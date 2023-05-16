const db = require('../models/clienteDB');
const db_perros = require('../models/perroDB');
const validaciones = require('../helpers/validaciones');
const mailer = require('../../mail');
const NotFoundError = require('../helpers/errors/NotFoundError');


module.exports = {
    index: async (req,res) => {
        /*
        1 listar clientes
        2 pasar la variable clientes a la vista
        3 chequear permiso de admin para acceder a la ruta(clientesRouter)
        */
        if(req.query.e){
            var error = "ID inválida";
        }
        else{
            var error = null;
        }
        var clientes = await db.listarClientes();
        if (clientes.length === 0){
            clientes = null;
        }
        res.render('clientes/index', { 
            title: 'Clientes',
            message: 'Inicio clientes',
            clientes: clientes,
            error: error
         });
    },

    registrarGet: async (req,res) => {
        /*
        1 chequear permiso de admin para acceder a la ruta(clientesRouter)
        */
        var cliente = {
            email: "",
            nombre: "",
            apellido: "",
            telefono: "",
            dni: ""
        }
        res.render('clientes/registrar', {
            title: 'Registrar cliente',
            message: 'Registrar cliente',
            cliente: cliente
        });
    },

    registrarPost: async (req,res) => {
        /*
        1 chequear permiso de admin para acceder a la ruta(clientesRouter)
        2 validar datos de entrada
        3 si pasa la validacion redirect a clientes y registrar el alta
        4 si no pasa la validacion volver a enviar los datos a la vista registro(render)
        y enviar el error.
        5 generar contraseña 
        6 enviar contraseña al mail del cliente
        */
        var newCliente = {
            email: req.body.email,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            telefono: req.body.telefono,
            dni: parseInt(req.body.dni),
            password: ""
        }
        // 2 helpers.validaciones.js validaciones.nombre, dni, telefono. email apellido. obtener error
        var result = validaciones.validarNuevoCliente(newCliente);
        if (result != "valido"){
            
            //validacion fallida
            // 4 volver a registro con los datos ingresados
            res.render('clientes/registrar', {
                title: 'Registrar cliente',
                message: 'Registrar cliente',
                cliente: newCliente,
                error: result
            });
        }
        else {
            
            //validacion exitosa, validar que no exista el email y el dni
            if (await db.existeEmail(newCliente.email)){
                res.render('clientes/registrar', {
                    title: 'Registrar cliente',
                    message: 'Registrar cliente',
                    cliente: newCliente,
                    error: "El email ya está en uso",
                });
            }
            else if (await db.existeDni(newCliente.dni)){
                res.render('clientes/registrar', {
                    title: 'Registrar cliente',
                    message: 'Registrar cliente',
                    cliente: newCliente,
                    error: "El DNI ya está en uso"
                });
            }
            else{
            // 5 generar contraseña 
            var chars = "abcdefghijklmnopqrstubwsyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            var password = '';	
                for(i=0; i<5; i++){
                password+=chars.charAt(Math.floor(Math.random()*chars.length));
                }
            newCliente.password = password;
            console.log(newCliente);
            // 3 dar el alta en la BBDD
            db.agregarCliente(newCliente);
            // 6 enviar contraseña al mail del cliente
            // mailer.sendMail('newCliente.email','titulo',"cuerpo del mensaje + newCliente.password");
            res.render('exito', {
                title: "Éxito",
                message: "Éxito",
                info: "El cliente se registró con éxito"
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
        var result = validaciones.validarBusquedaCliente(nombre);
        if (result != "válido"){
            res.render('clientes/index', {
                title: 'Clientes', 
                message: 'Inicio clientes',
                clientes: null,
                error: result
            })
        }
        console.log(nombre);
        //2 buscar en la bd
        var clientes = await db.buscarCliente(nombre);
        if (clientes.length === 0){
            clientes = null;
        }
        console.log(clientes);
        //3 render basico
        res.render('clientes/index', {
            title: 'Clientes', 
            message: 'Inicio clientes',
            clientes: clientes,
            info: "Resultados de la busqueda",
            nombre: nombre,
        })
    },

    verCliente: async (req,res,next) => {
        /*
        1 obtener id del parametro. validar?
        2 buscar id en la BBDD
        3 devolver los datos
        */
        // 1
        var id = req.params.id;
        var idCliente = parseInt(id);
        if (isNaN(idCliente)){
            res.redirect('/clientes?e=u');
        }
        else{
            // 3 
            var cliente = await db.buscarClienteById(idCliente);
            if (cliente == null){
                try{
                    throw new NotFoundError();
                }
                catch(err){
                    next(err);
                }
            }
            else{
                res.render('clientes/cliente', {
                    title: 'Cliente', 
                    message: 'Perfil del cliente',
                    cliente: cliente
                });
            }
        }
    },

    mascotas: async (req,res,next) => {
        /*
        1 obtener la lista de mascotas del cliente
        */
        var id = req.params.id;
        var idCliente = parseInt(id);
        if (isNaN(idCliente)){
            res.redirect('/clientes?e=u');
        }
        else{
            var clienteInfo = await db_perros.mascotasCliente(idCliente);
            if (clienteInfo == null){
                try{
                    throw new NotFoundError();
                }
                catch(err){
                    next(err);
                }
            }
            else{
                var mascotas = clienteInfo.perros;
                if (mascotas.length < 1){
                    res.render('clientes/mascotas', {
                        title: 'Mascotas',
                        message: 'Mascotas de '+ clienteInfo.nombre,
                        mascotas: null,
                        error: "No se encontraron mascotas ",
                        idCliente:idCliente
                    });
                }
                else{
                    res.render('clientes/mascotas', {
                        title: 'Mascotas',
                        message: 'Mascotas de '+ clienteInfo.nombre,
                        mascotas: mascotas,
                        idCliente:idCliente
                    });
                }
            }
        }
    }
}