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
    }
}
