const express = require('express');
const path = require('path');


const app = express();
const port = 3000;


app.use(express.static('public'));


app.set('views',path.resolve(__dirname,'./src/views'));

app.get('/', (req,res) => {
    res.send("Hola mundo");
});


app.listen(port, () => {
    console.log(`Escuchando puerto ${port}`)
  });