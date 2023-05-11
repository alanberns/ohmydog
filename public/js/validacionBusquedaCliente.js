/* A la etiqueta html que tenga el id "formulario"
  le agregamos comportamiento cuando se hace submit. */
$("#formulario").submit(function(event){
  var validez = "true";
  
  // Expresiones regulares
  var regexNombre = /^[a-zA-Z ]{1,50}$/;
  
  // Se prueba la expresión regular con el string del input
  if(!regexNombre.test($("#nombre").val())) validez = "Ingrese un nombre válido.";
  
  /* Si validez se mantiene en "true" el formulario es correcto y se envía,
      caso contrario se muestra un mensaje y se cancela el envío. */
  if(validez != "true"){
      alert(validez);
      event.preventDefault();
  }
});