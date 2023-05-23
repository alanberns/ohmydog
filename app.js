//imports
const express = require('express');
const path = require('path');
require("dotenv").config();
const errorHandler = require('./src/helpers/handlers/errorHandler');

var session = require('express-session');
const nocache = require('nocache');


//inicializacion
const app = express();
const port = process.env.PORT;



//routers
const indexRoutes = require('./src/routes/indexRoutes');
const clientesRoutes = require('./src/routes/clientesRoutes');
const perrosRoutes = require('./src/routes/perrosRoutes');
const serviciosRoutes = require('./src/routes/serviciosRoutes');
const adopcionesRoutes = require('./src/routes/adopcionesRoutes');
const sesionRoutes = require('./src/routes/sesionRoutes');
const turnoRoutes = require('./src/routes/turnoRoutes');
const usuariosRoutes = require('./src/routes/usuariosRoutes');



//indicar a la app lo que debe usar
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/ajax', express.static(__dirname + '/node_modules/ajax/lib/'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.use(session({
    secret: 'OhMyDog',
    saveUninitialized: true,
    resave: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(nocache());

app.use((req, res, next) => {
  res.locals.sesion = req.session;
  next();
});


//view engine
app.set('views',path.resolve(__dirname,'./src/views'));
app.set('view engine', 'pug');


//rutas
app.use('/', indexRoutes);
app.use('/clientes',clientesRoutes);
app.use('/perros',perrosRoutes);
app.use('/servicios',serviciosRoutes);
app.use('/adopciones',adopcionesRoutes);
app.use('/sesion', sesionRoutes);
app.use('/turno', turnoRoutes);
app.use('/usuario',usuariosRoutes);


//error handler
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Escuchando puerto ${port}`)
  });