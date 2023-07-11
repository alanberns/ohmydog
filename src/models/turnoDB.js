const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    clienteConPerros: async function clienteConPerros(id_cliente){
        return await prisma.clientes.findUnique({
            where:{
                id: parseInt(id_cliente)
            },
            include: {
                perros: true
            }
        });
    },

    cantVacunasA: async function cantVacunasA(id_perro){
        return await prisma.historias.count({
            where:{
                AND:{
                    id_perro:{
                        equals: parseInt(id_perro)
                    },
                    practica:{
                        equals: "Vacuna A"
                    }
                }
            }
        });
    },

    cantVacunasB: async function cantVacunasB(id_perro){
        return await prisma.historias.count({
            where:{
                AND:{
                    id_perro:{
                        equals: parseInt(id_perro)
                    },
                    practica:{
                        equals: "Vacuna B"
                    }
                }
            }
        });
    },

    tieneTurnoVacunaA: async function tieneTurnoVacunaA(id_perro){
        var resultado = await prisma.turnos.findMany({
            where:{
                AND:{
                    id_perro:{
                        equals: parseInt(id_perro)
                    },
                    practica:{
                        equals: "Vacuna A"
                    },
                    dia:{
                        gte: new Date()
                    }
                }
            }
        });
        return (resultado.length >= 1);
    },

    tieneTurnoVacunaB: async function tieneTurnoVacunaB(id_perro){
        var resultado = await prisma.turnos.findMany({
            where:{
                AND:{
                    id_perro:{
                        equals: parseInt(id_perro)
                    },
                    practica:{
                        equals: "Vacuna B"
                    },
                    dia:{
                        gte: new Date()
                    }
                }
            }
        });
        return (resultado.length >= 1);
    },

    verPerro: async function verPerro(id_perro){
        return await prisma.perros.findUnique({
            where:{
                id: parseInt(id_perro)
            }
        });
    },

    crearTurno: async function crearTurno(turno) {
        return await prisma.turnos.create({
            data:{
                practica: turno.practica,
                dia: turno.dia,        
                franja: turno.franja,
                cliente: { connect: { id: parseInt(turno.id_cliente) } },
                perro: { connect: { id: parseInt(turno.id_perro) } },
                estado: "Pendiente"
            }
        });
    },

    listarTurnos: async function listarTurnos(id_cliente) {
        return await prisma.turnos.findMany({
            where:{
                id_cliente: parseInt(id_cliente)
            },
            include:{
                perro: true
            }
        });
    },

    cancelarTurno: async function cancelarTurno(id) {
        return await prisma.turnos.update({
            where:{
                id: parseInt(id)
            },
            data:{
                estado: "Cancelado"
            }
        });
    },

    listarTurnosFecha: async function listarTurnosFecha(fecha) {
        return await prisma.turnos.findMany({
            where:{
                AND:{
                    dia:{
                        equals: fecha
                    },
                    estado:{
                        not: "Aceptado"
                    }
                }
            },
            include:{
                perro: true
            }
        });
    },

    aceptarTurno: async function aceptarTurno(id) {
        return await prisma.turnos.update({
            where:{
                id: parseInt(id)
            },
            data:{
                estado: "Aceptado"
            }
        });
    },

    rechazarTurno: async function rechazarTurno(id) {
        return await prisma.turnos.update({
            where:{
                id: parseInt(id)
            },
            data:{
                estado: "Rechazado"
            }
        });
    },

    verDetalle: async function verDetalle(id) {
        return await prisma.turnos.findUnique({
            where:{
                id: parseInt(id)
            },
            include:{
                cliente: true,
                perro: true
            }
        });
    },

    listarTurnosAceptadosFecha: async function listarTurnosAceptadosFecha(fecha) {
        return await prisma.turnos.findMany({
            where:{
                AND:{
                    dia:{
                        equals: fecha
                    },
                    estado:{
                        equals: "Aceptado"
                    }
                }
            },
            include:{
                perro: true
            }
        });
    }
};