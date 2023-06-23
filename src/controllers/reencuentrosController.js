const db = require('../models/reencuentrosDB');
const validaciones = require('../helpers/validaciones');
const mailer = require('../../mail');
const NotFoundError = require('../helpers/errors/NotFoundError');


module.exports = {
    index: async (req,res) => {
        /*
        foto, la zona, la fecha, sexo, edad, características particulares, si tenía collar, comportamiento del perro en el momento, y teléfono y email para contactarse
        */
        res.send("reencuentros")
    }
}