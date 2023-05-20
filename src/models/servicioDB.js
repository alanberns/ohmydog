const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


module.exports = {
    existeServicio: async function existeServicio(servicio) {
        var result = await prisma.publicacion_servicios.findMany({
            where:{
                AND: {
                    nombre:{
                        equals: servicio.nombre,
                        mode: 'insensitive'
                    },
                    apellido:{
                        equals: servicio.apellido,
                        mode: 'insensitive'
                    },
                    servicio:{
                        equals: servicio.servicio,
                        mode: 'insensitive'
                    },
                }
            }
        });
        return result.length > 0;
    },

    agregarServicio: async function agregarServicio(servicio) {
        return await prisma.publicacion_servicios.create({
            data:{
                servicio: servicio.servicio,
                nombre: servicio.nombre,
                apellido: servicio.apellido,
                zona: servicio.zona,
                horario: servicio.horario,
                email_contacto: servicio.email_contacto,
                estado: servicio.estado
            }
        });
    },

    listarServicios: async function listarServicios() {
        return await prisma.publicacion_servicios.findMany({
            where:{
                estado: "Publicado"
            }
        })
    },

    buscarServicioById: async function buscarServicioById(servicioId) {
        return await prisma.publicacion_servicios.findUnique({
            where: {
                id: parseInt(servicioId)
            }
        })
    },

    buscarServicioByEstado: async function buscarServicioByEstado(estado){
        return await prisma.publicacion_servicios.findMany({
            where:{
                estado: estado
            }
        })
    }
}