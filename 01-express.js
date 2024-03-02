const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Configuraciones de Express
app.use(express.json()); // Parsear JSON
app.use(express.urlencoded({ extended: false })); // Parsear datos de formulario urlencoded

// Configuraciones de vistas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views/');

// Rutas
app.use('/', require('./router/rutas'));
app.use('/miniature', require('./router/miniature'));

// Servir archivos estáticos
app.use('/static', express.static(__dirname + '/public'));

// Manejo de errores  404
app.use((req, res) => {
    res.status(404).sendFile(`${__dirname}/assets/404.html`);
});

// Configuración de la base de datos
require('dotenv').config();

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.ylzwpme.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log(e));

// Iniciar el servidor
const port = process.env.PORT ||  3000;
app.listen(port, () => {
    console.log(`Iniciando Express en el puerto ${port}`);
    console.log(`http://localhost:${port}`);
});

// Exportar la aplicación para su uso en otros archivos
module.exports = app;
