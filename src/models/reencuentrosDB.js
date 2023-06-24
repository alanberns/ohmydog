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
                cliente: { connect: { id: parseInt(publicacion.clienteId) } },
            }
        })
    }
}