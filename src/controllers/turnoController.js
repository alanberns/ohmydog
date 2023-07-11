const dbTurno = require('../models/turnoDB');
const mailer = require('../../mail');

module.exports = {
    solicitar: async (req,res) => {
        var cliente = await dbTurno.clienteConPerros(req.session.usuario);
        var error = "";
        if(cliente.perros.length == 0)
            error = "Debe tener un perro registrado para poder solicitar un turno";

        res.render('turno/solicitar', {
            title: 'Solicitar turno',
            message: 'Solicitar turno',
            usuario: req.session,
            perros: cliente.perros,
            error: error
        });
    },
    
    intento: async (req, res) => {
        var fechaHoy = new Date();
        var fechaTurno = new Date(req.body.dia);
        var cliente = await dbTurno.clienteConPerros(req.session.usuario);
        var cantVacunasA = await dbTurno.cantVacunasA(req.body.perro);
        var cantVacunasB = await dbTurno.cantVacunasB(req.body.perro);
        var tieneTurnoVacunaA = await dbTurno.tieneTurnoVacunaA(req.body.perro);
        var tieneTurnoVacunaB = await dbTurno.tieneTurnoVacunaB(req.body.perro);
        var perro = await dbTurno.verPerro(req.body.perro);
        var edadEnDias = (fechaHoy - perro.fecha_nacimiento) / 86400000;


        var error = "";
        if(req.body.practica == "Vacuna B"){
            if(cantVacunasB == 2) error = "El perro ya ha sido vacunado con Vacuna B";
            else if(cantVacunasB == 1 && tieneTurnoVacunaB) error = "Ya dispone de un turno para la segunda dosis de Vacuna B";
            else if(cantVacunasB == 0 && edadEnDias < 120) error = "El perro debe tener al menos 4 meses para poder aplicarle la Vacuna B";
        }
        if(req.body.practica == "Vacuna A"){
            if(cantVacunasA == 2) error = "El perro ya ha sido vacunado con Vacuna A";
            else if(cantVacunasA == 1 && tieneTurnoVacunaA) error = "Ya dispone de un turno para la segunda dosis de Vacuna A";
            else if(cantVacunasA == 0 && edadEnDias < 60) error = "El perro debe tener al menos 2 meses para poder aplicarle la Vacuna A";
        }
        if(fechaTurno <= fechaHoy) error = "Debe solicitar un turno a partir de la fecha de mañana";


        if(error != ""){
            res.render('turno/solicitar', {
                title: 'Solicitar turno',
                message: 'Solicitar turno',
                usuario: req.session,
                perros: cliente.perros,
                error: error
            });
        }
        else{
            var nuevoTurno = {
                id_perro: req.body.perro,
                practica: req.body.practica,
                franja: req.body.franja,
                dia: fechaTurno,
                id_cliente: req.session.usuario
            };
            await dbTurno.crearTurno(nuevoTurno);
            var info = "Turno solicitado correctamente";
            var turnos = await dbTurno.listarTurnos(req.session.usuario);
            turnos.forEach(turno => turno.dia.setTime(turno.dia.getTime() + 10800000));
            res.render('turno/listar', {
                title: 'Mis Turnos',
                message: 'Mis Turnos',
                usuario: req.session,
                turnos: turnos,
                info: info
            });
        }
    },

    listar: async (req,res) => {
        var turnos = await dbTurno.listarTurnos(req.session.usuario);
        if(turnos.length == 0)
            var info = "Aún no ha solicitado ningún turno";
        else{
            turnos.forEach(turno => turno.dia.setTime(turno.dia.getTime() + 10800000));
        }

        res.render('turno/listar', {
            title: 'Mis Turnos',
            message: 'Mis Turnos',
            usuario: req.session,
            turnos: turnos,
            info: info
        });
    },

    cancelar: async (req,res) => {
        await dbTurno.cancelarTurno(req.params.id);
        var turnos = await dbTurno.listarTurnos(req.session.usuario);
        turnos.forEach(turno => turno.dia.setTime(turno.dia.getTime() + 10800000));
        var info = "Turno cancelado exitosamente";

        res.render('turno/listar', {
            title: 'Mis Turnos',
            message: 'Mis Turnos',
            usuario: req.session,
            turnos: turnos,
            info: info
        });
    },

    listarAdmin: async (req,res) => {
        var fecha = new Date();
        if(req.body.dia){
            fecha = new Date(req.body.dia);
            fecha.setTime(fecha.getTime() + 10800000);
        }

        var turnos = await dbTurno.listarTurnosFecha(fecha);
        if(turnos.length == 0)
            var info = "Aún no han solicitado ningún turno para este día";
        else{
            turnos.forEach(turno => turno.dia.setTime(turno.dia.getTime() + 10800000));
        }

        res.render('turno/listarAdmin', {
            title: 'Listado de Turnos',
            message: 'Listado de Turnos '+fecha.toLocaleDateString(),
            usuario: req.session,
            turnos: turnos,
            fecha: fecha,
            info: info
        });
    },

    aceptar: async (req,res) => {
        await dbTurno.aceptarTurno(req.params.id);
        var info = "Turno aceptado exitosamente";
        var turno = await dbTurno.verDetalle(req.params.id);
        var fecha = turno.dia;

        if(!fecha)
            fecha = new Date();
        fecha.setTime(fecha.getTime() + 10800000);

        var turnos = await dbTurno.listarTurnosFecha(fecha);
        if(turnos.length >= 0)
            turnos.forEach(turno => turno.dia.setTime(turno.dia.getTime() + 10800000));

        
        if(turno.franja == "Temprano")
            var franja = "de 8 a 13hs";
        else
            var franja = "de 15 a 20hs";
        mailer.sendMail(turno.cliente.email,'Turno aceptado OhMyDog!',"Tu solicitud de turno en la veterinaria OhMyDog! fue aceptado para el día " + fecha + " y la franja horaria " + franja);
        

        res.render('turno/listarAdmin', {
            title: 'Listado de Turnos',
            message: 'Listados de Turnos '+fecha.toLocaleDateString(),
            usuario: req.session,
            turnos: turnos,
            fecha: fecha,
            info: info
        });
    },

    rechazar: async (req,res) => {
        await dbTurno.rechazarTurno(req.params.id);
        var info = "Turno rechazado exitosamente";
        var turno = await dbTurno.verDetalle(req.params.id);
        var fecha = turno.dia;

        if(!fecha)
            fecha = new Date();
        fecha.setTime(fecha.getTime() + 10800000);

        var turnos = await dbTurno.listarTurnosFecha(fecha);
        if(turnos.length >= 0)
            turnos.forEach(turno => turno.dia.setTime(turno.dia.getTime() + 10800000));

        
        if(turno.franja == "Temprano")
            var franja = "de 8 a 13hs";
        else
            var franja = "de 15 a 20hs";
        mailer.sendMail(turno.cliente.email,'Turno rechazado OhMyDog!',"Tu solicitud de turno en la veterinaria OhMyDog! fue rechazado para el día " + fecha + " y la franja horaria " + franja + ". Por favor vuelva a solicitar un turno.");
        

        res.render('turno/listarAdmin', {
            title: 'Listado de Turnos',
            message: 'Listados de Turnos '+fecha.toLocaleDateString(),
            usuario: req.session,
            turnos: turnos,
            fecha: fecha,
            info: info
        });
    },

    verDetalle: async (req,res) => {
        var turno = await dbTurno.verDetalle(req.params.id);
        turno.dia.setTime(turno.dia.getTime() + 10800000);
        turno.dia = turno.dia.toLocaleDateString();

        res.render('turno/verDetalle', {
            title: 'Detalle Turno',
            message: 'Detalle del Turno',
            usuario: req.session,
            turno: turno
        });
    },

    listarAceptadosAdmin: async (req,res) => {
        var fecha = new Date();
        if(req.body.dia){
            fecha = new Date(req.body.dia);
            fecha.setTime(fecha.getTime() + 10800000);
        }

        var turnos = await dbTurno.listarTurnosAceptadosFecha(fecha);
        if(turnos.length == 0)
            var info = "Aún no hay turnos para este día";
        else{
            turnos.forEach(turno => turno.dia.setTime(turno.dia.getTime() + 10800000));
        }

        res.render('turno/listarAceptadosAdmin', {
            title: 'Turnos Aceptados',
            message: 'Listado de Turnos Aceptados '+fecha.toLocaleDateString(),
            usuario: req.session,
            turnos: turnos,
            fecha: fecha,
            info: info
        });
    },
}