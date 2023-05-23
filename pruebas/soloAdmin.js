const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function delete_all() {
    await prisma.publicacion_adopcion.deleteMany();
    await prisma.publicacion_servicios.deleteMany();
    await prisma.perros.deleteMany();
    await prisma.administradores.deleteMany();
    await prisma.clientes.deleteMany();
}

async function admins() {
    return await prisma.administradores.create({
        data:{
            id: 1,
            nombre:"Pedro",
            apellido: "OhMyDog",
            email: "ohmydogis2@gmail.com",
            password: "12345"
        }
    })
}


delete_all();
console.log("Datos borrados");
admins();
console.log("Admin creado");