/* A la etiqueta html que tenga el id "formulario"
  le agregamos comportamiento cuando se hace submit. */
  $("#formulario").submit(function(event){
    var validez = "true";

    // Expresiones regulares
    var regexNombre = /^[a-zA-Z ]{1,255}$/;
    var regexHorario = /^[a-zA-Z0-9-:/ ]{1,255}$/;
    var regexEmail = /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/;

    // Se prueba la expresión regular con el string del input
    if(!regexNombre.test($("#servicio").val())) validez = "Ingrese un servicio válido.";
    else if(!regexNombre.test($("#nombre").val())) validez = "Ingrese un nombre válido.";
    else if(!regexNombre.test($("#apellido").val())) validez = "Ingrese un apellido válido.";
    else if(!regexNombre.test($("#zona").val())) validez = "Ingrese una zona válido.";
    else if(!regexHorario.test($("#horario").val())) validez = "Ingrese un horario válido.";
    else if(!regexEmail.test($("#email_contacto").val())) validez = "Ingrese un email válido.";

    /* Si validez se mantiene en "true" el formulario es correcto y se envía,
        caso contrario se muestra un mensaje y se cancela el envío. */
    if(validez != "true"){
        alert(validez);
        event.preventDefault();
    }
});