const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


module.exports = {
    listarDonacionesActivas: async function listarDonacionesActivas(hoy){
        return await prisma.publicacion_donacion.findMany({
            where:{
                fecha_fin:{
                    gte: hoy
                }
            }
        })
    },

    existeDonacion: async function existeDonacion(donacion){
        var result = await prisma.publicacion_donacion.findMany({
            where:{
                nombre: donacion.nombre
            }
        })
        return result.length > 0;
    },

    agregarDonacion: async function agregarDonacion(donacion){
        return await prisma.publicacion_donacion.create({
            data:{
                nombre: donacion.nombre,
                monto: donacion.monto,
                fecha_fin: donacion.fecha_fin,
                monto_actual: donacion.monto_actual
            }
        })
    },

    buscarDonacionById: async function buscarDonacionById(donacionId){
        return await prisma.publicacion_donacion.findUnique({
            where:{
                id: parseInt(donacionId)
            }
        })
    },

    sumarMontoDonacion: async function sumarMontoDonacion(donacionId, monto_donacion){
        return await prisma.publicacion_donacion.update({
            where:{
                id: parseInt(donacionId)
            },
            data:{
                monto_actual: {
                    increment: parseInt(monto_donacion),
                }
            }
        })
    }
}