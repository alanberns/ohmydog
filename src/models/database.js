const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

//este archivo puede llamarse indexDB
//para que no cargue con todas las consultas que 
//se le hagan a la bd en total

module.exports = {
    //prueba de la bd
    index: async function consulta() {
        return await prisma.cliente.findMany()        
    }
}