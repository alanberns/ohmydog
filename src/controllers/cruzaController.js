const db = require('../models/cruzaDB');
const validaciones = require('../helpers/validaciones');
const mailer = require('../../mail');
const NotFoundError = require('../helpers/errors/NotFoundError');


module.exports = {
    index: async (req,res) => {
        /*
        1 enviar el cartel de informacion rojo
        */
        var mascotasCliente = await db.mascotasCliente(req.session.usuario);
        console.log(mascotasCliente)
        res.render('cruza/index',{
        title: 'Cruza',
        message: 'Cruza de perros',
        error: "Tener cachorros es una enorme responsabilidad, hay muchos perros que aún buscan un hogar",
        cruzas: mascotasCliente
       })
    },
}