const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


var consulta = {
    agregarCliente: async function agregarCliente(cliente){
        return await prisma.clientes.create({
            data:{
                nombre: cliente.nombre,
                apellido: cliente.apellido,
                email: cliente.email,
                telefono: cliente.telefono,
                dni: cliente.dni,
                password: cliente.password,
                descuento: cliente.descuento
            }
        })
    },
    
    agregarPerro: async function agregarPerro(perro){
        return await prisma.perros.create({
            data: {
                nombre: perro.nombre,
                raza: perro.raza,
                color: perro.color,
                fecha_nacimiento: perro.fecha_nacimiento,
                observaciones: perro.observaciones,
                link_foto: perro.link_foto,
                cliente: { connect: { id: parseInt(perro.clienteId) } },
            }
        })
    },
    
    agregarAdopcion: async function agregarAdopcion(adopcion){
        return await prisma.publicacion_adopciones.create({
            data:{
                nombre: adopcion.nombre,        
                edad: adopcion.edad,
                raza: adopcion.raza,
                color: adopcion.color,
                sexo: adopcion.sexo,
                observaciones: adopcion.observaciones,
                origen: adopcion.origen,
                estado: adopcion.estado,
                tamanio: adopcion.tamanio,
                cliente: { connect: { id: parseInt(adopcion.clienteId) } },
            }
        })
    }
}


async function donacion(){
    var donacion1 = {
        nombre: "Operación de Perrito",
        monto: 50000,
        fecha_fin: new Date(2023,12,12),
        monto_actual: 0,
        fecha_inicio: new Date(2023,05,30)
    }
    
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
    await prisma.donaciones.deleteMany();
    await prisma.publicacion_adopciones.deleteMany();
    await prisma.publicacion_servicios.deleteMany();
    await prisma.publicacion_donaciones.deleteMany();
    await prisma.perros.deleteMany();
    await prisma.administradores.deleteMany();
    await prisma.clientes.deleteMany();
}


async function main(){
    await delete_all();
    console.log("datos borrados");

    await admins();
    console.log("admin creado");

    // CREAR CLIENTES
    var datosCliente1 = {
        nombre: "Lionel",
        apellido: "Messi",
        email: "alan_berns@yahoo.com.ar",
        dni: 23888555,
        telefono: "2217770099",
        password: "12345",
        descuento: 0,
    }
    var datosCliente2 = {
        nombre: "Enzo",
        apellido: "Fernandez",
        email: "test@test.com",
        dni: 40555000,
        telefono: "1134248900",
        password: "12345",
        descuento: 0,
    } 
    var cliente1 = await consulta.agregarCliente(datosCliente1);
    console.log(cliente1)
    var cliente2 = await consulta.agregarCliente(datosCliente2);
    console.log("clientes creados");

    //CREAR PERROS
    var datosPerro1 = {
        nombre: "Lobo",
        raza: "mestizo",
        color: "gris",
        fecha_nacimiento: new Date(2022,12,12),
        link_foto: "",
        observaciones: "patitas blancas",
        clienteId: cliente1.id
    }
    var datosPerro2 = {
        nombre: "Perrito",
        raza: "golden",
        color: "rubio",
        fecha_nacimiento: new Date(2020,12,12),
        link_foto: "",
        observaciones: "sin observaciones",
        clienteId: cliente1.id
    }
    var perro1 = await consulta.agregarPerro(datosPerro1);
    var perro2 = await consulta.agregarPerro(datosPerro2);
    console.log("perros creados");

    //CREAR ADOPCIONES
    var datosAdopcion1 = {
        nombre: "Perrito",
        edad: "10 meses",
        raza: "mestizo",
        color: "negro",
        sexo: "Macho",
        observaciones: "es tranquilo" ,
        origen: "los dueños se mudan",
        estado: "Activo",
        tamanio: "Chico",
        clienteId: cliente1.id
    }
    var datosAdopcion2 = {
        nombre: "Firulais",
        edad: "10 meses",
        raza: "mestizo",
        color: "negro",
        sexo: "Macho",
        observaciones: "es tranquilo" ,
        origen: "los dueños se mudan",
        estado: "Activo",
        tamanio: "Chico",
        clienteId: cliente2.id
    }
    var adopcion1 = await consulta.agregarAdopcion(datosAdopcion1);
    //var adopcion2 = await consulta.agregarAdopcion(datosAdopcion2);
    console.log("adopciones creadas");
}

main();