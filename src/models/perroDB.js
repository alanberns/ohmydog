const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


module.exports = {
    agregarPerro: async function agregarPerro(perro) {
        return await prisma.perros.create({
            data: {
                nombre: perro.nombre,
                raza: perro.raza,
                color: perro.color,
                fecha_nacimiento: perro.fecha_nacimiento,
                observaciones: perro.observaciones,
                link_foto: perro.link_foto,
                cliente: { connect: { id: parseInt(perro.id_cliente) } },
            }
        })
    },

    existePerroDeCliente: async function existePerroDeCliente(perro){
        var result = await prisma.clientes.findMany({
            where: {
                id: parseInt(perro.id_cliente),
                perros:{
                    some:{
                        nombre: {
                            equals: perro.nombre,
                            mode: 'insensitive'
                        }
                    }
                }
            },
        })
        return (! result.length == 0);
    },
    
    buscarPerro: async function buscarPerro(nombre) {
        return await prisma.perros.findMany({
            where: {
                nombre: {
                    contains: nombre,
                    mode: 'insensitive'
                }
            },
            include: {
                cliente: true
            }
        })
    },

    listarPerros: async function listarPerros(){
        return await prisma.perros.findMany({
            include: {
                cliente: true
            }
        });
    },

    mascotasCliente: async function mascotasCliente(id_cliente){
        return await prisma.clientes.findUnique({
            where:{
                id: parseInt(id_cliente),
            },
            include: {
                perros: true
            }
        })
    }
}