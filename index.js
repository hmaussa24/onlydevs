var http = require('http');
var env = require('node-env-file'); // .env file
env(__dirname + '/.env');
var login = require('./src/users/Login')
var registro = require('./src/users/Register')
var express = require('express');


var PORT = process.env.PORT;
var app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.disable('x-powered-by');
app.set('port', PORT);
app.use(express.json())

app.post('/login', login) //login. 
app.post('/registro', registro) //login. 

app.use(express.static('public'));
http.createServer(app).listen(app.get('port'), function () {
    console.log('Only Devs run in: http://'+ process.env.HOST+'/'+ app.get('port'));
});