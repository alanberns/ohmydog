$("#formulario").submit(function(event){
  var validez = "true";

  var regexEmail = /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/;
  var regexPassword = /^[a-zA-Z0-9]{3,50}$/;

  if(!regexEmail.test($("#email").val())) validez = "Ingrese un email v&aacute;lido";
  else if(!regexPassword.test($("#password").val())) validez = "Ingrese una contrase&ntilde;a v&aacute;lida";

  if(validez != "true"){
      alert(validez);
      event.preventDefault();
  }
});