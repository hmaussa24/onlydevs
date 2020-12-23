const connection = require('../../config/config')
var jwt = require('jsonwebtoken')


let login = (req, res) => {
    const email = req.body.email
    const password = req.body.password
    if (email && password) {
        connection.query('SELECT * FROM usuarios WHERE email=? AND password=?', [email, password], function (error, result, fields) {
            if (error) {
                return res.json({ 'login': false, 'error': true, 'message': 'Error inesperado. intentelo nuevamente mas tarde' }).send();
            } else {
                if (result[0]) {
                    var tokenData = {
                        user: email
                        // ANY DATA
                    }
                    var token = jwt.sign(tokenData, 'Secret Password', {
                        expiresIn: 60 * 60 * 24 // expires in 24 hours
                    })
                    return res.json({ 'login': true, 'user': result, 'token': token }).send();
                } else {
                    return res.json({ 'login': false, 'error': true, 'message': 'Usuario o Contaseña invalidos' }).send();
                }
            }
        })
    } else {
        return res.json({ 'login': false, 'error': true, 'message': 'Usuario o Contaseña invalidos' }).send();
    }
}

module.exports = login