/* A la etiqueta html que tenga el id "formulario"
  le agregamos comportamiento cuando se hace submit. */
  $("#formulario").submit(function(event){
    var validez = "true";

    // Expresiones regulares
    var regexNombre = /^[a-zA-Z ]{1,50}$/;
    var regexEdad = /^[a-zA-Z0-9ñ ]{1,255}$/;

    // Se prueba la expresión regular con el string del input
    if(!regexNombre.test($("#origen").val())) validez = "Ingrese un origen válido.";
    else if(!regexNombre.test($("#nombre").val())) validez = "Ingrese un nombre válido.";
    else if(!regexNombre.test($("#raza").val())) validez = "Ingrese una raza válida.";
    else if(!regexNombre.test($("#color").val())) validez = "Ingrese un color válido.";
    else if(!regexEdad.test($("#edad").val())) validez = "Ingrese una edad válida.";
    else if(!regexNombre.test($("#sexo").val())) validez = "Ingrese una sexo válida.";
    else if(!regexNombre.test($("#observaciones").val())) validez = "Ingrese un texto de observaciones válido.";

    /* Si validez se mantiene en "true" el formulario es correcto y se envía,
        caso contrario se muestra un mensaje y se cancela el envío. */
    if(validez != "true"){
        alert(validez);
        event.preventDefault();
    }
});