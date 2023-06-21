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
    }
}