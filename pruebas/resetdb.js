const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function index() {
    return await prisma.clientes.create({
        data: {
            id: 1,
            nombre: "Lionel",
            apellido: "Messi",
            email: "alan_berns@yahoo.com.ar",
            dni: 23888555,
            telefono: "2217770099",
            password: "12345",
            descuento: 0,
        }
    })
}
async function admins() {
    return await prisma.administradores.create({
        data:{
            nombre:"Pedro",
            apellido: "OhMyDog",
            email: "ohmydogis2@gmail.com",
            password: "12345"
        }
    })
}


async function delete_all() {
    await prisma.publicacion_adopcion.deleteMany();
    await prisma.publicacion_servicios.deleteMany();
    await prisma.perros.deleteMany();
    await prisma.administradores.deleteMany();
    await prisma.clientes.deleteMany();
}


delete_all();
console.log("datos borrados");
index();
admins();
console.log("datos creados");