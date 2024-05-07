const db = require('../models/database')

module.exports = {
    index: async (req,res) => {
        res.render('index', {
            title: 'Inicio',
            message: 'Oh My Dog!'
        });
    }
}