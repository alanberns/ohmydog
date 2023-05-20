/* A la etiqueta html que tenga el id "formulario"
  le agregamos comportamiento cuando se hace submit. */
$("#formulario").submit(function(event){
  var validez = "true";

  // Expresiones regulares
  var regexNombre = /^[a-zA-Z ]{3,50}$/;
  var regexDni = /^[0-9]{6,9}$/;
  var regexTelefono = /^[0-9]{9,11}$/;
  var regexEmail = /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/;

  // Se prueba la expresión regular con el string del input
  if(!regexNombre.test($("#nombre").val())) validez = "Ingrese un nombre válido.";
  else if(!regexNombre.test($("#apellido").val())) validez = "Ingrese un apellido válido.";
  else if(!regexDni.test($("#dni").val())) validez = "Ingrese un DNI válido.";
  else if(!regexEmail.test($("#email").val())) validez = "Ingrese un email válido.";
  else if($("#telefono").val() != "") {if(!regexTelefono.test($("#telefono").val())) validez = "Ingrese un teléfono válido";}
  

  /* Si validez se mantiene en "true" el formulario es correcto y se envía,
      caso contrario se muestra un mensaje y se cancela el envío. */
  if(validez != "true"){
      alert(validez);
      event.preventDefault();
  }
});