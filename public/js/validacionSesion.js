$("#formulario").submit(function(event){
  var validez = "true";

  var regexEmail = /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/;
  var regexPassword = /^[a-zA-Z0-9]{3,50}$/;

  if(!regexEmail.test($("#email").val())) validez = "Ingresá un email válido";
  else if(!regexPassword.test($("#password").val())) validez = "Ingresá una contraseña válida";

  if(validez != "true"){
      alert(validez);
      event.preventDefault();
  }
});