const db = require('../models/turnoDB')

module.exports = {
    solicitar: async (req,res) => {
        res.render('turno/solicitar', {
            title: 'Solicitar turno',
            message: 'Solicitar turno',
            usuario: req.session
        });
    }
}