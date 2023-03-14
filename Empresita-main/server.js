let { express, app, ms, fetch, base64 } = require('./config');
let { databaseDriver } = require('./app/controllerDB');
let database = new databaseDriver({
  "collection": 'products'
});

var Routers = {};

// Ruta principal
app.get('/', async (req, res) => {
  res.sendFile(__dirname + '/app/public/pages/index.html')
})


app.get('/faq-frequently-asked-questions', async (req, res) => {

})
console.log(__dirname)