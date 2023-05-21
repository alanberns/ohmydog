/* A la etiqueta html que tenga el id "formulario"
  le agregamos comportamiento cuando se hace submit. */
  $("#formulario").submit(function(event){
    var validez = "true";
    
    var extensiones = ["jpg","jpeg","png"];  

    var extension = $("#link_foto").val().slice(($("#link_foto").val().lastIndexOf(".") - 1 >>> 0) + 2);

    if(!extensiones.includes(extension)) validez = "Ingrese un archivo con extension: 'jpeg' 'jpg' 'png'";

    /* Si validez se mantiene en "true" el formulario es correcto y se envía,
    caso contrario se muestra un mensaje y se cancela el envío. */
    if(validez != "true"){
        alert(validez);
        event.preventDefault();
    }
});