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

    agregarHistoria: async function agregarHistoria(historia){
        return await prisma.historias.create({
            data:{
                practica: historia.practica,
                observaciones: historia.observaciones,
                dia: historia.dia,
                monto: historia.monto,
                cliente: { connect:{ id: parseInt(historia.id_cliente)}},
                perro: { connect:{ id: parseInt(historia.id_perro)}}
            }
        })
    },

    agregarTurno: async function agregarTurno(turno){
        return await prisma.turnos.create({
            data:{
                practica: turno.practica,
                dia: turno.dia,
                franja: turno.franja,
                estado: turno.estado,
                cliente: { connect:{ id: parseInt(turno.id_cliente)}},
                perro: { connect:{ id: parseInt(turno.id_perro)}}
            }
        })
    },
}


async function admins() {
    await prisma.administradores.create({
        data:{
            nombre:"Pedro",
            apellido: "OhMyDog",
            email: "ohmydogis2@gmail.com",
            password: "12345"
        }
    });
    return await prisma.administradores.create({
        data:{
            nombre:"Lucia",
            apellido: "OhMyDog",
            email: "admin@lucia.com",
            password: "123"
        }
    });
}


async function delete_all() {
    await prisma.historias.deleteMany();
    await prisma.turnos.deleteMany();
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
    var campaña_donacion1 = await consulta.agregarCampañaDonacion(datos_campaña_donacion1);
    var campaña_donacion2 = await consulta.agregarCampañaDonacion(datos_campaña_donacion2);
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
    var donacion1 = await consulta.registrarDonacion(datos_donacion1);
    var donacion2 = await consulta.registrarDonacion(datos_donacion2);
    console.log("Donaciones creadas");

    await consulta.sumarMontoDescuento(datos_donacion1.clienteId, donacion1.monto * 0.2);
    await consulta.sumarMontoDescuento(datos_donacion2.clienteId, donacion2.monto * 0.2);
    console.log('Descuentos asignados a clientes');

    await consulta.sumarMontoDonacion(campaña_donacion1.id, donacion1.monto);
    await consulta.sumarMontoDonacion(campaña_donacion1.id, donacion2.monto);
    console.log('Sumas asignadas a campañas');



    // ----------- Datos de prueba para TURNOS ----------------

    var datosClienteSinPerros = {
        nombre: "Cliente",
        apellido: "SinPerros",
        email: "cliente@sinperros.com",
        dni: 11222333,
        telefono: "2215550000",
        password: "123",
        descuento: 0,
    };
    var datosClienteConPerros = {
        nombre: "Cliente",
        apellido: "ConPerros",
        email: "cliente@conperros.com",
        dni: 22333444,
        telefono: "2215551111",
        password: "123",
        descuento: 0,
    };
    var datosClienteConPerroYTurnos = {
        nombre: "Cliente",
        apellido: "ConPerro YTurnos",
        email: "taborda.jorge@hotmail.com",
        dni: 33444555,
        telefono: "2215552222",
        password: "123",
        descuento: 0,
    };
    var clienteSinPerros = await consulta.agregarCliente(datosClienteSinPerros);
    var clienteConPerros = await consulta.agregarCliente(datosClienteConPerros);
    var clienteConPerroYTurnos = await consulta.agregarCliente(datosClienteConPerroYTurnos);


    var datosPerroYaVacunado = {
        nombre: "Perro YaVacunado",
        raza: "Mestizo",
        color: "Gris",
        fecha_nacimiento: new Date(2020,10,10),
        link_foto: "",
        observaciones: "Oreja mordida",
        clienteId: clienteConPerros.id
    };
    var datosPerroMayorCientoVeinte = {
        nombre: "Perro Mayor CientoVeinte",
        raza: "Collie",
        color: "Naranja y Blanco",
        fecha_nacimiento: new Date(2023,1,1),
        link_foto: "",
        observaciones: "Ninguna",
        clienteId: clienteConPerros.id
    };
    var datosPerroMenorCientoVeinte = {
        nombre: "Perro Menor CientoVeinte",
        raza: "Chihuahua",
        color: "Marron",
        fecha_nacimiento: new Date(2023,4,1),
        link_foto: "",
        observaciones: "Tiembla poco para ser un chihuahua",
        clienteId: clienteConPerros.id
    };
    var datosPerroMenorSesenta = {
        nombre: "Perro Menor Sesenta",
        raza: "Doberman",
        color: "Marron y negro",
        fecha_nacimiento: new Date(2023,6,1),
        link_foto: "",
        observaciones: "Muy mansito",
        clienteId: clienteConPerros.id
    };
    var datosPerroConTurnos = {
        nombre: "Perro ConTurnos",
        raza: "Pitbull",
        color: "Blanco y negro",
        fecha_nacimiento: new Date(2022,6,1),
        link_foto: "",
        observaciones: "Muy jugueton",
        clienteId: clienteConPerroYTurnos.id
    };
    var perroYaVacunado = await consulta.agregarPerro(datosPerroYaVacunado);
    var perroMayorCientoVeinte = await consulta.agregarPerro(datosPerroMayorCientoVeinte);
    var perroMenorCientoVeinte = await consulta.agregarPerro(datosPerroMenorCientoVeinte);
    var perroMenorSesenta = await consulta.agregarPerro(datosPerroMenorSesenta);
    var perroConTurnos = await consulta.agregarPerro(datosPerroConTurnos);


    var datosHistoriaPrimerVacunaA = {
        practica: "Vacuna A",
        observaciones: "Primera dosis",
        dia: new Date('2022-01-01'),
        monto: 200,
        id_cliente: clienteConPerros.id,
        id_perro: perroYaVacunado.id
    };
    var datosHistoriaSegundaVacunaA = {
        practica: "Vacuna A",
        observaciones: "Segunda dosis",
        dia: new Date('2023-01-01'),
        monto: 400,
        id_cliente: clienteConPerros.id,
        id_perro: perroYaVacunado.id
    };
    var datosHistoriaPrimerVacunaB = {
        practica: "Vacuna B",
        observaciones: "Primera dosis",
        dia: new Date('2022-06-01'),
        monto: 300,
        id_cliente: clienteConPerros.id,
        id_perro: perroYaVacunado.id
    };
    var datosHistoriaSegundaVacunaB = {
        practica: "Vacuna B",
        observaciones: "Segunda dosis",
        dia: new Date('2023-06-01'),
        monto: 450,
        id_cliente: clienteConPerros.id,
        id_perro: perroYaVacunado.id
    };
    var historiaPrimerVacunaA = await consulta.agregarHistoria(datosHistoriaPrimerVacunaA);
    var historiaSegundaVacunaA = await consulta.agregarHistoria(datosHistoriaSegundaVacunaA);
    var historiaPrimerVacunaB = await consulta.agregarHistoria(datosHistoriaPrimerVacunaB);
    var historiaSegundaVacunaB = await consulta.agregarHistoria(datosHistoriaSegundaVacunaB);


    var datosTurnoConsulta = {
        dia: new Date('2023-08-01'),
        franja: "Tarde",
        practica: "Consulta",
        estado: "Pendiente",
        id_perro: perroConTurnos.id,
        id_cliente: clienteConPerroYTurnos.id
    };
    var datosTurnoOperacion = {
        dia: new Date('2023-08-01'),
        franja: "Tarde",
        practica: "Operacion",
        estado: "Pendiente",
        id_perro: perroConTurnos.id,
        id_cliente: clienteConPerroYTurnos.id
    };
    var datosTurnoPeluqueria = {
        dia: new Date('2023-08-01'),
        franja: "Tarde",
        practica: "Desparacitacion",
        estado: "Aceptado",
        id_perro: perroConTurnos.id,
        id_cliente: clienteConPerroYTurnos.id
    };
    var turnoConsulta = await consulta.agregarTurno(datosTurnoConsulta);
    var turnoOperacion = await consulta.agregarTurno(datosTurnoOperacion);
    var turnoPeluqueria = await consulta.agregarTurno(datosTurnoPeluqueria);
}

main();