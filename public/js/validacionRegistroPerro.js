/* A la etiqueta html que tenga el id "formulario"
  le agregamos comportamiento cuando se hace submit. */
$("#formulario").submit(function(event){
    var validez = "true";
    // Fecha de HOY en formato aaaa-mm-dd
    var hoy = new Date().toISOString().slice(0, 10);

    // Expresiones regulares
    var regexNombre = /^[a-zA-Z ]{1,255}$/;
    var regexObservaciones = /^[a-zA-Z0-9 ]{1,255}$/;
    var regexColor = /^[a-zA-Z ]{1,255}$/;
    var regexRaza = /^[a-zA-Z ]{1,255}$/;

    // Se prueba la expresión regular con el string del input
    if(!regexNombre.test($("#nombre").val())) validez = "Ingrese un nombre válido.";
    else if(!regexRaza.test($("#raza").val())) validez = "Ingrese una raza válida.";
    else if(!regexColor.test($("#color").val())) validez = "Ingrese un color válido.";
    else if(!regexObservaciones.test($("#observaciones").val())) validez = "Ingrese un texto de observaciones válido.";
    else if(!isValidDate($("#fecha_nacimiento").val())) validez = "Ingrese una fecha de nacimiento válida.";
    else if(hoy < $("#fecha_nacimiento").val()) validez = "No puede ingresar fechas futuras.";

    /* Si validez se mantiene en "true" el formulario es correcto y se envía,
        caso contrario se muestra un mensaje y se cancela el envío. */
    if(validez != "true"){
        alert(validez);
        event.preventDefault();
    }

    /* Esta función me la copié de internet, toma una
    fecha en formato aaaa-mm-dd y corrobora que sea válida */
    function isValidDate(dateString) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateString.match(regEx)) return false;  // Invalid format
    var d = new Date(dateString);
    var dNum = d.getTime();
    if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0,10) === dateString;
  }
});