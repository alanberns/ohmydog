module.exports = {
    validarNuevoCliente: function(cliente){
        // Expresiones regulares
        var regexNombre = /^[a-zA-Z ]{1,255}$/;
        var regexDni = /^[0-9]{6,9}$/;
        var regexTelefono = /^[0-9]{9,11}$/;
        var regexEmail = /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/;

        var validez = "valido";
        if(!regexNombre.test(cliente.nombre)) validez = "Ingrese un nombre válido.";
        else if(!regexNombre.test(cliente.apellido)) validez = "Ingrese un apellido válido.";
        else if(!regexDni.test(cliente.dni)) validez = "Ingrese un DNI válido.";
        else if(!regexEmail.test(cliente.email)) validez = "Ingrese un email válido.";
        else if(cliente.telefono != ""){if(!regexTelefono.test(cliente.telefono)) validez = "Ingrese un telefono válido";}
        return validez;
    },

    validarBusquedaCliente: function(nombre){
        //expresion regular
        var regexNombre = /^[a-zA-Z ]{1,255}$/;

        var validez = "válido";
        if(!regexNombre.test(nombre)) validez = "Ingrese un nombre válido.";

        return validez;
    },

    validarNuevoPerro: function(perro){
        // Fecha de HOY en formato aaaa-mm-dd
        var hoy = new Date().toISOString().slice(0, 10);

        // Expresiones regulares
        var regexNombre = /^[a-zA-Z ]{1,255}$/;
        var regexObservaciones = /^[a-zA-Z0-9 ]{1,255}$/;
        var regexColor = /^[a-zA-Z ]{1,255}$/;
        var regexRaza = /^[a-zA-Z ]{1,255}$/;
        
        var validez = "valido";

        function isValidDate(dateString) {
            var regEx = /^\d{4}-\d{2}-\d{2}$/;
            if(!dateString.match(regEx)) return false;  // Invalid format
            var d = new Date(dateString);
            var dNum = d.getTime();
            if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
            return d.toISOString().slice(0,10) === dateString;
        }

        if(!regexNombre.test(perro.nombre)) validez = "Ingrese un nombre válido.";
        else if(!regexRaza.test(perro.raza)) validez = "Ingrese una raza válida.";
        else if(!regexColor.test(perro.color)) validez = "Ingrese un color válido.";
        else if(!regexObservaciones.test(perro.observaciones)) validez = "Ingrese un texto de observaciones válido.";
        else if(!isValidDate(perro.fecha_nacimiento)) validez = "Ingrese una fecha de nacimiento válida.";
        else if(hoy < perro.fecha_nacimiento) validez = "No puede ingresar fechas futuras.";  

        return validez;
    },

    validarBusquedaPerro: function(nombre){
        //expresion regular
        var regexNombre = /^[a-zA-Z ]{1,255}$/;

        var validez = "válido";
        if(!regexNombre.test(nombre)) validez = "Ingrese un nombre válido.";

        return validez;
    },

    validarNuevoServicio: function(servicio, dias_seleccionados, horario_inicio, horario_fin){
        // Expresiones regulares
        var regexNombre = /^[a-zA-Z ]{1,255}$/;
        var regexEmail = /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/;

        var validez = "valido";
        if(!regexNombre.test(servicio.servicio)) validez = "Ingrese un servicio válido.";
        else if(!regexNombre.test(servicio.nombre)) validez = "Ingrese un nombre válido.";
        else if(!regexNombre.test(servicio.apellido)) validez = "Ingrese un apellido válido.";
        else if(!regexEmail.test(servicio.email_contacto)) validez = "Ingrese un email válido.";
        else if(dias_seleccionados == 0) validez = "Seleccioná por lo menos un día";
        else if(horario_inicio >= horario_fin) validez = "El horario de inicio es igual o posterior al horario de fin"

        return validez;
    },

    validarNuevaAdopcion: function(adopcion){
    // Expresiones regulares
    var regexNombre = /^[a-zA-Z ]{1,255}$/;
    var regexEdad = /^[a-zA-Z0-9ñ ]{1,255}$/;

    var validez = "valido";
    if(!regexNombre.test(adopcion.origen)) validez = "Ingrese un origen válido.";
    else if(!regexNombre.test(adopcion.nombre)) validez = "Ingrese un nombre válido.";
    else if(!regexNombre.test(adopcion.raza)) validez = "Ingrese una raza válida.";
    else if(!regexNombre.test(adopcion.color)) validez = "Ingrese un color válido.";
    else if(!regexEdad.test(adopcion.edad)) validez = "Ingrese una edad válida.";
    else if(!regexNombre.test(adopcion.sexo)) validez = "Ingrese una sexo válida.";
    else if(!regexNombre.test(adopcion.observaciones)) validez = "Ingrese un texto de observaciones válido.";

    return validez;
    },

    validarExtensionFoto: function(directorio){
        var validez = "valido";
        var extensiones = ["jpg","jpeg","png"];

        var extension = directorio.slice((directorio.lastIndexOf(".") - 1 >>> 0) + 2);

        if(!extensiones.includes(extension)) validez = "Ingrese un archivo con extension: 'jpeg' 'jpg' 'png'";

        return validez;
    },

    validarContacto: function(nombre,email){
        // Expresiones regulares
        var regexNombre = /^[a-zA-Z ]{1,255}$/;
        var regexEmail = /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/;

        var validez = "valido";

        if(!regexNombre.test(nombre)) validez = "Ingrese un nombre válido.";
        else if(!regexEmail.test(email)) validez = "Ingrese un email válido.";

        return validez;
    },

    validarNuevaDonacion: function(donacion){
        // Expresiones regulares
        var regexNombre = /^[a-zA-Z ]{1,255}$/;
        // Fecha de HOY en formato aaaa-mm-dd
        var hoy = new Date().toISOString().slice(0, 10);

        var validez = "valido";

        if(!regexNombre.test(donacion.nombre)) validez = "Ingrese un nombre válido.";
        else if(hoy >= donacion.fecha_fin) validez = "La fecha debe ser posterior a hoy";
        else if(donacion.monto <= 0) validez = "El monto debe ser positivo";

        return validez;
    },

    validarTarjeta: function(tarjeta){
        // Expresiones regulares
        var regexNumTarjeta = /^[0-9]{16}$/;
        var regexCodigoTarjeta = /^[0-9]{3}$/;
        var regexNombre = /^[a-zA-Z ]{1,255}$/;
        var mesActual = new Date().toISOString().slice(0, 7);

        var validez = "valido";

        if(!regexNombre.test(tarjeta.nombre_tarjeta)) validez = "Ingrese un nombre válido.";
        else if(!regexCodigoTarjeta.test(tarjeta.codigo)) validez = "Ingrese un código de seguridad válido";
        else if(!regexNumTarjeta.test(tarjeta.numero_tarjeta)) validez = "Ingrese un número de tarjeta válido";
        else if(!tarjeta.vencimiento > mesActual) validez = "La fecha debe ser igual o posterior al mes actual";

        return validez;
    }
}