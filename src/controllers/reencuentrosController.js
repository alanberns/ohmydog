const db = require('../models/reencuentrosDB');
const validaciones = require('../helpers/validaciones');
const mailer = require('../../mail');
const NotFoundError = require('../helpers/errors/NotFoundError');


module.exports = {
    index: async (req,res) => {
        /*
        
        */
        var publicaciones = []
        res.render("reencuentros/index",{
            title: 'Perros perdidos y buscados',
            message: 'Perros perdidos y buscados',
            publicaciones: publicaciones
        })
    },

    nuevoGet: async (req,res) => {
        /*

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

        */
        var publicacion= {
            tipo: req.body.tipo,
            zona: req.body.zona,
            edad: req.body.edad,
            caracteristicas: req.body.caracteristicas,
            comportamiento: req.body.comportamiento,
            sexo: req.body.sexo,
            telefono: req.body.telefono,
            email: req.body.email,
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

    agregarFoto: async (req,res) => {
        /*

        */
        
    }
}