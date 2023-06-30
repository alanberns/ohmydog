const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


module.exports = {
    agregarPublicacion: async function agregarPublicacion(publicacion){
        return await prisma.publicacion_reencuentros.create({
            data:{
                tipo: publicacion.tipo,
                zona: publicacion.zona,
                edad: publicacion.edad,
                caracteristicas: publicacion.caracteristicas,
                comportamiento: publicacion.comportamiento,
                sexo: publicacion.sexo,
                telefono: publicacion.telefono,
                email: publicacion.email,
                fecha: publicacion.fecha,
                link_foto: "",
                estado: "Activa",
                cliente: { connect: { id: parseInt(publicacion.clienteId) } },
            }
        })
    },

    listarPublicaciones: async function listarPublicaciones(){
        return await prisma.publicacion_reencuentros.findMany();
    },

    filtrarPublicaciones: async function filtrarPublicaciones(busqueda){
        return await prisma.publicacion_reencuentros.findMany({
            where:{
                tipo: {
                    contains: busqueda
                }
            }
        })
    },

    cambiarLink_foto: async function cambiarLink_foto(publicacion_reencuentrosId,link_foto){
        return await prisma.publicacion_reencuentros.update({
            where:{
                id: parseInt(publicacion_reencuentrosId)
            },
            data:{
                link_foto: link_foto
            }
        })
    },

    buscarPublicacionById: async function buscarPublicacionById(publicacion_reencuentrosId){
        return await prisma.publicacion_reencuentros.findUnique({
            where:{
                id: parseInt(publicacion_reencuentrosId)
            }
        })
    }
}