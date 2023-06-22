const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


module.exports = {
    mascotasCliente: async function mascotasCliente(clienteId){
        return await prisma.clientes.findUnique({
            where:{
                id: parseInt(clienteId),
            },
            include: {
                perros: {
                    include:{
                        cruza: true
                    }
                }
            }
        })
    },

    agregarCruza: async function agregarCruza(cruza){
        return await prisma.publicacion_cruzas.create({
            data:{
                periodo_celo: cruza.periodo_celo,
                sexo: cruza.sexo,
                perro: { connect: { id: parseInt(cruza.perroId) } },
            }
        })
    },

    buscarPerrosCompatibles: async function buscarPerrosCompatibles(perro){
        return await prisma.perros.findMany({
            where:{
                AND:{
                    raza:{
                        equals: perro.raza,
                        mode: 'insensitive'
                    },
                    cruza:{
                        sexo:{
                            not: perro.cruza.sexo
                        }
                    },
                    cliente:{
                        id: {
                            not: parseInt(perro.clienteId)
                        }
                    }
                }
            },
            include:{
                cruza:true
            }
    
        })
    },

    buscarPublicacionCruza: async function buscarPublicacionCruza(perroId){
        return await prisma.publicacion_cruzas.findUnique({
            where:{
                perroId: parseInt(perroId)
            },
            include:{
                perro:true
            }
        })
    }
}