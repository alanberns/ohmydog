const db = require('../models/reencuentrosDB');
const db_clientes = require('../models/clienteDB');
const validaciones = require('../helpers/validaciones');
const fs = require('fs');
const NotFoundError = require('../helpers/errors/NotFoundError');


module.exports = {
    index: async (req,res) => {
        /*
        Enviar todas las publicaciones de reencuentros
        */
        var publicaciones = await db.listarPublicaciones();
        res.render("reencuentros/index",{
            title: 'Perros perdidos y buscados',
            message: 'Perros perdidos y buscados',
            publicaciones: publicaciones,
            busqueda: "Todos"
        })
    },

    nuevoGet: async (req,res) => {
        /*
        Renderizar el formulario de nueva publicacion de reencuentros
        */
        var publicacion= {
            tipo: "",
            zona: "",
            edad: "",
            caracteristicas: "",
            comportamiento: "",
            sexo: "",
            telefono: "",
            email: "",
            link_foto: "",
        }
        res.render('reencuentros/nuevo',{
            title: 'Publicar perro perdido',
            message: 'Publicar perro perdido',
            publicacion: publicacion
        })
    },

    nuevoPost: async (req,res) => {
        /*
        Obtener el body del formulario de nueva publicacion de reencuentro
        Checks: obtener los datos del usuario si quiere publicar algun dato suyo de contacto
        */
        /*
        Para obtener los datos modificados:
        if req.body.telefono_nuevo.length > 0
        telefono: req.body.telefono_nuevo,
        email: req.body.email_nuevo,
        */
        var checks = {
            telefono: req.body.telefono,
            email: req.body.email
        }
        if (checks.telefono || checks.email){
            var cliente = await db_clientes.buscarClienteById(req.session.usuario);
        }
        var telefono = checks.telefono?cliente.telefono:""
        var email = checks.email?cliente.email:""
        var publicacion= {
            tipo: req.body.tipo,
            zona: req.body.zona,
            edad: req.body.edad,
            caracteristicas: req.body.caracteristicas,
            comportamiento: req.body.comportamiento,
            sexo: req.body.sexo,
            telefono: telefono,
            email: email,
            fecha: new Date(Date.now()),
            clienteId: req.session.usuario
        }
        var result = validaciones.validarPublicacionReencuentro(publicacion);
        if (result != "valido"){
            
            //validacion fallida
            res.render('reencuentros/nuevo',{
                title: 'Publicar perro perdido',
                message: 'Publicar perro perdido',
                publicacion: publicacion,
                error: result
            })
        }
        else{
            var publicacionCreada = await db.agregarPublicacion(publicacion);
            res.render('reencuentros/agregarFoto',{
                title: 'Publicar perro perdido',
                message: 'Publicar perro perdido',
                publicacionId: publicacionCreada.id,
                info: "Tu publicación ha sido creada, podes añadir una foto"
            })
        }
    },

    agregarFoto: async (req,res,next) => {
        /*
        1 obtener file

        2 validar extension
        
        3 El archivo se guarda en nuevo.extension -> se renombra a publicacion.id+.+extension
          Guardar file en: "/img/reencuentros/"+publicacion.id;
          GUARDAR EN LA DB:  publicacion.link_foto = "/img/reencuentros/"+publicacion.id;
        */
        console.log(req.file)
        var file = req.file;

        // Comprobamos que el fichero es de tipo imagen
        if (req.file.mimetype.indexOf('image')==-1){
            res.render('reencuentros/agregarFoto',{
                title: "Publicar perro perdido",
                message: "Publicar perro perdido",             
                error: "El archivo que deseas subir no es una imagen",
            });
        } 
        else {
            var result = validaciones.validarExtensionFoto(file.originalname);
            if (result != "valido"){
                res.render('reencuentros/agregarFoto',{
                    title: "Publicar perro perdido",
                    message: "Publicar perro perdido",   
                    error: result,
                });
            }
            else{
                // la foto se guarda en public/img/reencuentros/nuevo.extension
                var tmp_path = req.file.path;
                // Ruta donde colocaremos la imagen:  "/img/reencuentros/"+publicacion.id+.extension;        
                var nuevoNombre = req.params.id+ "." + req.file.originalname.slice((req.file.originalname.lastIndexOf(".") - 1 >>> 0) + 2);
                var link_foto = "/img/reencuentros/"+nuevoNombre;
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
    },

    busqueda: async (req,res) => {
        /* 
        1 Obtener el tipo de publicacion a buscar
        2 Enviar a la vista la lista de publicaciones de resultado y el tipo de publicacion
        */
        var busqueda = req.body.tipo;
        if (busqueda == "") {busqueda="Todos"}
        var publicaciones = await db.filtrarPublicaciones(busqueda);
        res.render("reencuentros/index",{
            title: 'Perros perdidos y buscados',
            message: 'Perros perdidos y buscados',
            publicaciones: publicaciones,
            info: 'resultados de la busqueda',
            busqueda: busqueda
        })
    },

    verPublicacion: async (req,res,next) =>{
        /*
        1 Obtener id y validar
        */
        var id = req.params.id;
        var publicacionId = parseInt(id);
        if (isNaN(publicacionId)){
            res.redirect('/reencuentros');
        }
        else{
            // verificar que el id esta registrado en la bd
            var publicacion = await db.buscarPublicacionById(id);
            if (publicacion == null){
                try{
                    throw new NotFoundError();
                }
                catch(err){
                    next(err);
                }
            }
            else{
                res.render('reencuentros/verPublicacion', {
                    title: 'Publicacion de reencuentro', 
                    message: 'Datos de la publicación',
                    publicacion: publicacion
                });
            }
        }
    }
}