const connection = require('../../config/config')
//var jwt = require('jsonwebtoken')

let getUser = (email) => {
    let user = email.split('@')
    return user[0]
}


let registro = (req, res) => {
    const email = req.body.email
    const name = req.body.name
    const password = req.body.password
    if (email && password && name) {
        connection.query('INSERT INTO usuarios(name, email,password, usuario, created_at) VALUES(?,?,?,?,?)', [name, email, password, getUser(email), null], function (error, result, fields) {
            if (error) {
                return res.json({ 'registor': false, 'error': true, 'message': 'Error inesperado. intentelo nuevamente mas tarde' }).send();
            } else {
                return res.json({ 'registro': true}).send();
            }
        })
    } else {
        return res.json({ 'registro': false, 'error': true, 'message': 'No se pudo completar el registro' }).send();
    }
}

module.exports = registro