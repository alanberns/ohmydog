const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    intentoCliente: async function intentoSesion(datos){
        var result = await prisma.clientes.findMany({
            where:{
                AND:{
                    email:{
                        equals: datos.email,
                        mode: 'insensitive'
                    },
                    password:{
                        equals: datos.password
                    }
                }
            }
        });
        return result;
    },

    intentoAdmin: async function intentoSesion(datos){
        var result = await prisma.administradores.findMany({
            where:{
                AND:{
                    email:{
                        equals: datos.email,
                        mode: 'insensitive'
                    },
                    password:{
                        equals: datos.password
                    }
                }
            }
        });
        return result;
    }
};