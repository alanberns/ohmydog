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
                id: adopcionId
            }
        })
    }
}