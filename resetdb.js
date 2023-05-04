const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function index() {
    return await prisma.clientes.create({
        data: {
            id: 1,
            nombre: "Lionel",
            apellido: "Messi",
        }
    })
}

async function delete_all() {
    await prisma.clientes.deleteMany();
}


delete_all();
console.log("datos borrados");
index();
console.log("datos creados");