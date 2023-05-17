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
                cliente: { connect: { id: parseInt(adopcion.clienteId) } },
            }
        })
    },

    
}