//imports
const express = require('express');
const path = require('path');
require("dotenv").config();
const errorHandler = require('./src/helpers/handlers/errorHandler');
const NotFoundError = require('./src/helpers/errors/NotFoundError');


//inicializacion
const app = express();
const port = process.env.PORT;


//routers
const indexRoutes = require('./src/routes/indexRoutes');
const clientesRoutes = require('./src/routes/clientesRoutes');
const perrosRoutes = require('./src/routes/perrosRoutes');


//indicar a la app lo que debe usar
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/ajax', express.static(__dirname + '/node_modules/ajax/lib/'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));



//view engine
app.set('views',path.resolve(__dirname,'./src/views'));
app.set('view engine', 'pug');


//rutas
app.use('/', indexRoutes);
app.use('/clientes',clientesRoutes);
app.use('/perros',perrosRoutes);


app.use(function(req, res, next) {
  throw new NotFoundError();
  // respond with html page
});

//error handler
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Escuchando puerto ${port}`)
  });