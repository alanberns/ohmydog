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
        publicacion= {
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
            message: 'Publicar perro perdido'
        })
    },

    nuevoPost: async (req,res) => {
        /*

        */
        publicacion= {
            zona: "",
            edad: "",
            caracteristicas: "",
            comportamiento: "",
            sexo: "",
            telefono: "",
            email: "",
            link_foto: "",
            fecha: new Date(Date.now())
        }
        // await db.agregarPublicacion(publicacion);
        res.send('nuevo post')
    }
}