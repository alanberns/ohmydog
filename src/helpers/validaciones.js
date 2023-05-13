module.exports = {
    validarNuevoCliente: function(cliente){
        // Expresiones regulares
        var regexNombre = /^[a-zA-Z ]{3,50}$/;
        var regexDni = /^[0-9]{6,9}$/;
        var regexTelefono = /^[0-9]{9,11}$/;
        var regexEmail = /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/;

        var validez = "valido";
        if(!regexNombre.test(cliente.nombre)) validez = "Ingrese un nombre válido.";
        else if(!regexNombre.test(cliente.apellido)) validez = "Ingrese un apellido válido.";
        else if(!regexDni.test(cliente.dni)) validez = "Ingrese un DNI válido.";
        else if(!regexEmail.test(cliente.email)) validez = "Ingrese un email válido.";
        else if(!regexTelefono.test(cliente.telefono)) validez = "Ingrese un telefono válido";

        return validez;
    },

    validarBusquedaCliente: function(nombre){
        //expresion regular
        var regexNombre = /^[a-zA-Z ]{1,50}$/;

        var validez = "válido";
        if(!regexNombre.test(nombre)) validez = "Ingrese un nombre válido.";

        return validez;
    },

    validarNuevoPerro: function(perro){
        // Fecha de HOY en formato aaaa-mm-dd
        var hoy = new Date().toISOString().slice(0, 10);

        // Expresiones regulares
        var regexNombre = /^[a-zA-Z ]{3,50}$/;
        var regexObservaciones = /^[a-zA-Z0-9 ]{1,255}$/;
        var regexColor = /^[a-zA-Z ]{3,50}$/;
        var regexRaza = /^[a-zA-Z ]{3,50}$/;
        
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
        var regexNombre = /^[a-zA-Z ]{1,50}$/;

        var validez = "válido";
        if(!regexNombre.test(nombre)) validez = "Ingrese un nombre válido.";

        return validez;
    },
}
