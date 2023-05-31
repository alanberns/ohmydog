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
    }
}