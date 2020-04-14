var mysql = require('mysql')
exports.mysql_connect = (req, res, next) => {
    res.locals.connection = mysql.createConnection({
        host: 'localhost',
        user: 'shams-e-shop',
        password: 'Computer!@#4',
        database: 'shams-e-shop'
    })
    res.locals.connection.connect()
    next()
}