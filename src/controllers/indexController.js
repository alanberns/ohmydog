const db = require('../models/database')

module.exports = {
    index: async (req,res) => {
        res.render('index', { title: 'Index', message: 'Hola mundo' });
    }
}