const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


module.exports = {
    registrarDonacion:  async function registrarDonacion(donacion){
        return await prisma.donaciones.create({
            data:{
                monto: parseInt(donacion.monto),
                fecha: donacion.fecha,
                cliente: { connect:{ id: parseInt(donacion.clienteId)}},
                publicacion_donacion: { connect: { id: parseInt(donacion.donacionId)}}
            }
        })
    },

    obtenerDonacionesCliente: async function obtenerDonacionesCliente(clienteId){
        return await prisma.clientes.findUnique({
            where:{
                id: parseInt(clienteId)
            },
            include:{
                donaciones: true
            }
        })
    },

    obtenerDonantes: async function obtenerDonantes(publicacion_donacionId){
        return await prisma.donaciones.findMany({
            where:{
                publicacion_donacionId: parseInt(publicacion_donacionId)
            },
            include:{
                cliente: true,
                publicacion_donacion: true
            }
        })
    }
}