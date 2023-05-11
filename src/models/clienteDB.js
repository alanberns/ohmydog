const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


module.exports = {
    agregarCliente: async function agregarCliente(cliente) {
        return await prisma.clientes.create({
            data: {
                nombre: cliente.nombre,
                apellido: cliente.apellido,
                email: cliente.email,
                telefono: cliente.telefono,
                dni: cliente.dni,
                password: cliente.password
            }
        })
    },

    existeEmail: async function existeEmail(email) {
        var result = await prisma.clientes.findUnique({
            where: {
                email: email
            }
        })
        return result != null;
    },

    existeDni: async function existeDni(dni) {
        var result = await prisma.clientes.findUnique({
            where: {
                dni: dni
            }
        })
        return result != null;
    }
}