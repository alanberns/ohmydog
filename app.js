//imports
const express = require('express');
const path = require('path');


//inicializacion
const app = express();
const port = 3000;


//routers


//indicar a la app lo que debe usar
app.use(express.static('public'));



//view engine
app.set('views',path.resolve(__dirname,'./src/views'));
//app.set('view engine', 'pug');


//rutas
app.get('/', (req,res) => {
    res.send("Hola mundo");
});



app.listen(port, () => {
    console.log(`Escuchando puerto ${port}`)
  });