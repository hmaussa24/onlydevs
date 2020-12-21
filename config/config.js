let mysql = require('mysql');
var env = require('node-env-file');
env(__dirname + '/.env');
let connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

module.exports = connection