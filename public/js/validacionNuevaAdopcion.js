/* A la etiqueta html que tenga el id "formulario"
  le agregamos comportamiento cuando se hace submit. */
  $("#formulario").submit(function(event){
    var validez = "true";

    // Expresiones regulares
    var regexNombre = /^[a-zA-Z ]{1,255}$/;
    var regexEdad = /^[a-zA-Z0-9ñÑ ]{1,255}$/;

    var rangoLongitud = {min: 1, max: 255};
    function cumpleLongitud(valor) {
        return valor.length >= rangoLongitud.min && valor.length <= rangoLongitud.max;
    }
    function esLetra(c, permitirNumeros) {
        return c == " " || c.toLowerCase() != c.toUpperCase() || permitirNumeros && !isNaN(c);
    }
    function contieneSoloLetras(texto, permitirNumeros) {
        for (var i = 0; i < texto.length; i++) {
            if (!esLetra(texto[i], permitirNumeros)) {
                return false;
            }
        }
        return true;
    }

    var origen = $("#origen").val();
    var nombre = $("#nombre").val();
    var raza = $("#raza").val();
    var color = $("#color").val();
    var edad = $("#edad").val();
    var sexo = $("#sexo").val();
    var observaciones = $("#observaciones").val();
    // Se prueba la expresión regular con el string del input
    if(!cumpleLongitud(origen) || !contieneSoloLetras(origen)) validez = "Ingrese un origen válido.";
    else if(!cumpleLongitud(nombre) || !contieneSoloLetras(nombre)) validez = "Ingrese un nombre válido.";
    else if(!cumpleLongitud(raza) || !contieneSoloLetras(raza)) validez = "Ingrese una raza válida.";
    else if(!cumpleLongitud(color) || !contieneSoloLetras(color)) validez = "Ingrese un color válido.";
    else if(!regexEdad.test(edad)) validez = "Ingrese una edad válida.";
    else if(!regexNombre.test(sexo)) validez = "Ingrese una sexo válida.";
    else if(!cumpleLongitud(observaciones) || !contieneSoloLetras(observaciones, true)) validez = "Ingrese un texto de observaciones válido.";

    /* Si validez se mantiene en "true" el formulario es correcto y se envía,
        caso contrario se muestra un mensaje y se cancela el envío. */
    if(validez != "true"){
        alert(validez);
        event.preventDefault();
    }
});