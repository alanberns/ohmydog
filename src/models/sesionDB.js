const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    intentoCliente: async function intentoSesion(datos){
        var result = await prisma.clientes.findOne({
            where:{
                AND:{
                    usuario:{
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
        var result = await prisma.administradores.findOne({
            where:{
                AND:{
                    usuario:{
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