const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


module.exports = {
    agregarAdopcion: async function agregarAdopcion(adopcion) {
        return await prisma.publicacion_adopcion.create({
            data:{
                nombre: adopcion.nombre,        
                edad: adopcion.edad,
                raza: adopcion.raza,
                color: adopcion.color,
                sexo: adopcion.sexo,
                observaciones: adopcion.observaciones,
                origen: adopcion.origen,
                estado: adopcion.estado,
                cliente: { connect: { id: parseInt(adopcion.clienteId) } },
            }
        })
    },

    listarAdopciones: async function listarAdopciones(){
        return await prisma.publicacion_adopcion.findMany();
    },

    buscarAdopcionById: async function buscarAdopcionById(adopcionId){
        return await prisma.publicacion_adopcion.findUnique({
            where:{
                id: parseInt(adopcionId)
            }
        })
    },

    buscarByEstado: async function buscarByEstado(estado){
        return await prisma.publicacion_adopcion.findMany({
            where:{
                estado: estado
            }
        })
    },

    confirmarAdopcion: async function confirmarAdopcion(adopcionId){
        return await prisma.publicacion_adopcion.update({
            where:{
                id: parseInt(adopcionId)
            },
            data:{
                estado: "Adoptado"
            }
        })
    },

    buscarAdopcionesByClienteId: async function buscarAdopcionesByClienteId(clienteId){
        return await prisma.clientes.findUnique({
            where: {
                id: parseInt(clienteId),
            },
            include: {
                adopciones: true
            },
        })
    },

    buscarAdopcionYClienteById: async function buscarAdopcionYClienteById(adopcionId){
        return await prisma.publicacion_adopcion.findUnique({
            where:{
                id: parseInt(adopcionId)
            },
            include:{
                cliente: true
            }
        })
    }
}