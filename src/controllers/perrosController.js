const db = require('../models/perroDB');
const db_clientes = require('../models/clienteDB');
const validaciones = require('../helpers/validaciones');
const NotFoundError = require('../helpers/errors/NotFoundError');
const fs = require('fs');


module.exports = {
    index: async (req,res,next) => {
        /*
        1 listar perros
        */
        if (req.query.e){
            var error = "ID inválida"
        }
        else{
            var error = null
        }
        var perros = await db.listarPerros();
        if(perros.length === 0){
            perros = null
        }
        res.render('perros/index', {
            title: "Mascotas",
            message: "Mascotas",
            perros: perros,
            error: error
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
            clienteId: req.params.id
        }
        var cliente = await db_clientes.buscarClienteById(perro.clienteId);
        res.render('perros/registrar', {
            title: 'Registrar perro',
            message: 'Registrar perro',
            perro: perro,
            cliente: cliente,
            hoy: new Date().toISOString().slice(0, 10)
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
       
        var cliente = await db_clientes.buscarClienteById(req.body.clienteId);
        var newPerro = {
            nombre: req.body.nombre,
            raza: req.body.raza,
            observaciones: req.body.observaciones,
            color: req.body.color,
            fecha_nacimiento: req.body.fecha_nacimiento,
            link_foto: "",
            clienteId: req.body.clienteId
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
                    error: "El cliente ya tiene un perro registrado con el nombre ingresado",
                    cliente: cliente
                });
            }
            else{
                // 3 dar el alta en la BBDD
                // fecha a Date: var fecha = new Date(newPerro.fecha_nacimiento);
                // Date a fecha: fecha.toISOString().slice(0,10)
                newPerro.fecha_nacimiento = new Date(newPerro.fecha_nacimiento);
                await db.agregarPerro(newPerro);
                
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
                info: "Resultados de la búsqueda",
                nombre: nombre,
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
            var perro = await db.buscarPerroById(id);
            if (perro == null){
                try{
                    throw new NotFoundError();
                }
                catch(err){
                    next(err);
                }
            }
            else{
                res.render('perros/perro', {
                    title: 'Mascota', 
                    message: 'Datos de la mascota',
                    perro: perro
                });
            }
        }
    },

    modificarPerroGet: async(req,res,next) => {
        /*
        1 obtener datos del perro y enviar a la vista
        */
        var id = req.params.id;
        var idPerro = parseInt(id);
        if (isNaN(idPerro)){
            res.redirect('/perros?e=u');
        }
        else{
            // verificar que el id esta registrado en la bd
            var perro = await db.buscarPerroById(id);
            if (perro == null){
                try{
                    throw new NotFoundError();
                }
                catch(err){
                    next(err);
                }
            }
            else{
                perro.fecha_nacimiento = perro.fecha_nacimiento.toISOString().slice(0,10);
                res.render('perros/modificarPerro', {
                    title: "Modificar mascota",
                    message: "Modificar mascota",
                    perro: perro,
                    hoy: new Date().toISOString().slice(0, 10)
                })
            }
        }
    },

    modificarPerroPost: async(req,res) => {
        /*
        1 obtener cuerpo post
        2 si el nombre fue modificado, no puede repetirse con otro
        perro del mismo dueño
        3 modificar los datos del perro
        */
        var perroMod = {
            id: req.body.id,
            nombre: req.body.nombre,
            raza: req.body.raza,
            color: req.body.color,
            observaciones: req.body.observaciones,
            fecha_nacimiento: req.body.fecha_nacimiento,
            clienteId: req.body.clienteId
        }

        // 2 helpers.validaciones.js 
        var result = validaciones.validarNuevoPerro(perroMod);
        if (result != "valido"){
            
            //validacion fallida
            // 4 volver a registro con los datos ingresados
            res.render('perros/modificarPerro', {
                title: "Modificar mascota",
                message: "Modificar mascota",
                perro: perroMod,
                error: result,
            });
        }
        else {
            var perroAModificar = await db.buscarPerroById(perroMod.id);
            console.log(perroMod.nombre +"   "+perroAModificar.nombre)
            //Validacion exitosa. Comprobar que si se modifico el nombre, no se haya elegido uno en uso para el mismo cliente
            if( perroMod.nombre != perroAModificar.nombre){
                if (await db.existePerroDeCliente(perroMod)){
                    res.render('perros/modificarPerro', {
                        title: "Modificar mascota",
                        message: "Modificar mascota",
                        perro: perroMod,
                        error: "El cliente ya tiene un perro registrado con el nombre ingresado",
                    });
                }
                else{
                    // nuevo nombre estaba disponible
                    // 3 dar el alta en la BBDD
                    perroMod.fecha_nacimiento = new Date(req.body.fecha_nacimiento);
                    await db.modificarPerro(perroMod);
            
            res.render('exito', {
                title: "Éxito",
                message: "Éxito",
                info: "Los datos de la mascota se modificaron exitosamente"
            });
                }
            }
            else{
            // no modifico el nombre
            // 3 dar el alta en la BBDD
            perroMod.fecha_nacimiento = new Date(req.body.fecha_nacimiento);
            await db.modificarPerro(perroMod);
            
            res.render('exito', {
                title: "Éxito",
                message: "Éxito",
                info: "Los datos de la mascota se modificaron exitosamente"
            });
            }
        }
    },

    agregarFotoGet: async(req,res) => {
        /*
        
        */
        res.render('perros/agregarFoto',{
            title: "Añadir foto",
            message: "Añadir foto a mascota",
            perroId: req.params.id 
        })
    },

    agregarFotoPost: async(req,res,next) => {
        /*
        1 obtener file

        2 validar extension
        
        3 El archivo se guarda en nuevo.extension -> se renombra a perro.id+.+extension
          Guardar file en: "/img/perros/"+perro.id;
          GUARDAR EN LA DB:  perro.link_foto = "/img/perros/"+perro.id;
        */
        console.log(req.file)
        var file = req.file;

        // Comprobamos que el fichero es de tipo imagen
        if (req.file.mimetype.indexOf('image')==-1){
            res.render('perros/agregarFoto',{
                title: "Añadir foto",
                message: "Añadir foto a mascota",
                perroId: req.params.id,
                error: "El archivo que deseas subir no es una imagen",
            });
        } 
        else {
            var result = validaciones.validarExtensionFoto(file.originalname);
            if (result != "valido"){
                res.render('perros/agregarFoto',{
                    title: "Añadir foto",
                    message: "Añadir foto a mascota",
                    perroId: req.params.id,
                    error: result,
                });
            }
            else{
                // la foto se guarda en public/img/perros/nuevo.extension
                var tmp_path = req.file.path;
                // Ruta donde colocaremos la imagen:  "/img/perros/"+perro.id+.extension;        
                var nuevoNombre = req.params.id+ "." + req.file.originalname.slice((req.file.originalname.lastIndexOf(".") - 1 >>> 0) + 2);
                var link_foto = "/img/perros/"+nuevoNombre;
                var target_path = file.destination+ '\\' + nuevoNombre;
                // Renombrar el archivo en tmp_path al directorio que hemos elegido en target_path
                fs.rename(tmp_path, target_path, (err) => {
                        if (err) throw err;
                    })
                // 3 guardar link en la BD
                await db.cambiarLink_foto(req.params.id,link_foto);
                res.render('exito',{
                    title: "Éxito",
                    message: "Foto añadida",
                    info: "Se añadió la foto exitosamente"
                });
            }
        }
    }
}