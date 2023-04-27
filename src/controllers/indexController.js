const db = require('../models/database')

module.exports = {
    index: async (req,res) => {
        //prueba de la bd
        console.log(await db.index())
        res.send("Hola mundo desde index controller.")
    }
}