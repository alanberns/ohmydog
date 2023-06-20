const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


module.exports = {
    agregarAdopcion: async function agregarAdopcion(adopcion) {
        return await prisma.publicacion_cruzas.findMany();
    },

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
}