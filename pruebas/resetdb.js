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
    },

    agregarCampañaDonacion: async function agregarCampañaDonacion(campaña){
        return await prisma.publicacion_donaciones.create({
            data:{
                nombre: campaña.nombre,
                monto: campaña.monto,
                fecha_fin: campaña.fecha_fin,
                monto_actual: campaña.monto_actual,
                fecha_inicio: campaña.fecha_inicio,
            }
        })
    },

    sumarMontoDonacion: async function sumarMontoDonacion(publicacion_donacionId, monto_donacion){
        return await prisma.publicacion_donaciones.update({
            where:{
                id: parseInt(publicacion_donacionId)
            },
            data:{
                monto_actual: {
                    increment: parseInt(monto_donacion),
                }
            }
        })
    },

    registrarDonacion:  async function registrarDonacion(donacion){
        return await prisma.donaciones.create({
            data:{
                monto: parseInt(donacion.monto),
                fecha: donacion.fecha,
                cliente: { connect:{ id: parseInt(donacion.clienteId)}},
                publicacion_donacion: { connect: { id: parseInt(donacion.publicacion_donacionId)}}
            }
        })
    },

    sumarMontoDescuento: async function sumarMontoDescuento(clienteId,beneficio){
        return await prisma.clientes.update({
            where:{
                id: parseInt(clienteId)
            },
            data:{
                descuento:{
                    increment: parseInt(beneficio),
                }
            }
        })
    },
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
    await prisma.publicacion_reencuentros.deleteMany();
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
    var datosCliente3 = {
        nombre: "Julian",
        apellido: "Alvarez",
        email: "test2@test.com",
        dni: 40555001,
        telefono: "1134248901",
        password: "12345",
        descuento: 0,
    }
    var cliente1 = await consulta.agregarCliente(datosCliente1);
    console.log(cliente1)
    var cliente2 = await consulta.agregarCliente(datosCliente2);
    var cliente3 = await consulta.agregarCliente(datosCliente3);
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
    var datosPerro3 = {
        nombre: "Srperro",
        raza: "golden",
        color: "rubio",
        fecha_nacimiento: new Date(2020,12,12),
        link_foto: "",
        observaciones: "primer perro",
        clienteId: cliente2.id
    }
    var datosPerro4 = {
        nombre: "Blanco",
        raza: "golden",
        color: "rubio",
        fecha_nacimiento: new Date(2020,12,12),
        link_foto: "",
        observaciones: "segundo perro",
        clienteId: cliente2.id
    }
    var datosPerro5 = {
        nombre: "Huesos",
        raza: "golden",
        color: "rubio",
        fecha_nacimiento: new Date(2020,12,12),
        link_foto: "",
        observaciones: "tercer perro",
        clienteId: cliente2.id
    }
    var perro1 = await consulta.agregarPerro(datosPerro1);
    var perro2 = await consulta.agregarPerro(datosPerro2);
    var perro3 = await consulta.agregarPerro(datosPerro3);
    var perro4 = await consulta.agregarPerro(datosPerro4);
    var perro5 = await consulta.agregarPerro(datosPerro5);
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

    //CAMPAÑAS DE DONACION

    var datos_campaña_donacion1 = {
        nombre: "Campaña con donaciones",
        monto: 50000,
        fecha_fin: new Date(2023,12,12),
        monto_actual: 0,
        fecha_inicio: new Date(2023,1,1)
    }
    var datos_campaña_donacion2 = {
        nombre: "Campaña sin donaciones",
        monto: 100000,
        fecha_fin: new Date(2023,12,12),
        monto_actual: 0,
        fecha_inicio: new Date(2023,1,1)
    }
    var datos_campaña_finalizada = {
        nombre: "Campaña finalizada",
        monto: 50000,
        fecha_fin: new Date(2022,12,12),
        monto_actual: 70000,
        fecha_inicio: new Date(2021,1,1)
    }
    var campaña_donacion1 = await consulta.agregarCampañaDonacion(datos_campaña_donacion1);
    var campaña_donacion2 = await consulta.agregarCampañaDonacion(datos_campaña_donacion2);
    var campaña_donacionFin = await consulta.agregarCampañaDonacion(datos_campaña_finalizada);
    console.log("Campañas de donación creadas");

    //DONACIONES
    var datos_donacion1 = {
        monto: 1000,
        fecha: new Date(2023,2,2),
        clienteId: cliente1.id,
        publicacion_donacionId: campaña_donacion1.id
    }
    var datos_donacion2 = {
        monto: 500,
        fecha: new Date(2023,2,2),
        clienteId: cliente1.id,
        publicacion_donacionId: campaña_donacion1.id
    }
    var datos_donacion3 = {
        monto: 70000,
        fecha: new Date(2022,2,2),
        clienteId: cliente3.id,
        publicacion_donacionId: campaña_donacionFin.id
    }
    var donacion1 = await consulta.registrarDonacion(datos_donacion1);
    var donacion2 = await consulta.registrarDonacion(datos_donacion2);
    var donacion3 = await consulta.registrarDonacion(datos_donacion3);
    console.log("Donaciones creadas");

    await consulta.sumarMontoDescuento(datos_donacion1.clienteId, donacion1.monto * 0.2);
    await consulta.sumarMontoDescuento(datos_donacion2.clienteId, donacion2.monto * 0.2);
    await consulta.sumarMontoDescuento(datos_donacion3.clienteId, donacion3.monto * 0.2);
    console.log('Descuentos asignados a clientes');

    await consulta.sumarMontoDonacion(campaña_donacion1.id, donacion1.monto);
    await consulta.sumarMontoDonacion(campaña_donacion1.id, donacion2.monto);
    console.log('Sumas asignadas a campañas');

}

main();