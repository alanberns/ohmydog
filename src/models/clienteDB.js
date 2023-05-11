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
    },

    buscarCliente: async function buscarCliente(nombre) {
        return await prisma.clientes.findMany({
            where: {
                nombre: {
                    contains: nombre,
                    mode: 'insensitive'
                }
            }
        })
    },

    buscarClienteById: async function buscarClienteById(id) {
        return await prisma.clientes.findUnique({
            where: {
                id: id
            }
        })
    }
}