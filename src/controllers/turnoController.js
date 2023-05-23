const db = require('../models/turnoDB')

module.exports = {
    solicitar: async (req,res) => {
        res.render('turno/solicitar', {
            title: 'Solicitar Turno | OhMyDog',
            message: 'Solicitar Turno',
            usuario: req.session
        });
    }
}