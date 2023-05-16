//imports
const express = require('express');
const path = require('path');
require("dotenv").config();
const errorHandler = require('./src/helpers/handlers/errorHandler');
var session = require('express-session');



//inicializacion
const app = express();
const port = process.env.PORT;



//routers
const indexRoutes = require('./src/routes/indexRoutes');
const sesionRoutes = require('./src/routes/sesionRoutes');



//indicar a la app lo que debe usar
app.use(express.static('public'));
app.use(session({
    secret: 'OhMyDog',
    saveUninitialized: true,
    resave: true
}));



//view engine
app.set('views',path.resolve(__dirname,'./src/views'));
app.set('view engine', 'pug');


//rutas
app.use('/', indexRoutes);
app.use('/sesion', sesionRoutes);



//error handler
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Escuchando puerto ${port}`)
  });