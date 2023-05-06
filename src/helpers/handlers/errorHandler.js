const errorHandler = (error, req, res, next) => {
    console.log(error.name, error.status, error.message);
    res.render('error', {title: "Error", error:error})
}

module.exports = errorHandler;

//middleware que usa app. app.use(errorHandler);
//const errorHandler = require('./src/helpers/handlers/errorHandler');

//si aparece el error lo gestiona: muestra la pag con la info.