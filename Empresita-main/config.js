let express = require('express');
let app = express();
let cors = require('cors');
let ms = require('ms')
let fetch = require('make-fetch-happen');
let base64 = require('base-64');
var Datastore = require('@yetzt/nedb');

// Express Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(express.static('./app/public'));

// ExpressApp Run
app.listen(3000, () => {
  console.log(`Escuchando: http://localhost:3000`)
});

// Se indica el directorio donde se almacenarán las plantillas 
app.set('views', './app/public/views');

// Se indica el motor del plantillas a utilizar
app.set('view engine', 'pug');

// Database Local
var databases = {};
databases.products = new Datastore('./app/public/database/products.db')
databases.products.loadDatabase();


module.exports = {express, app, ms, fetch, base64, databases}