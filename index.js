const config = require('./common/config/env.config.js')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var https = require('https')
var fs = require('fs')

var https_options = {
    key: fs.readFileSync("./ssl/api.key"),
    cert:fs.readFileSync("./ssl/api.crt"),
    ca:[
        fs.readFileSync("./ssl/ca.crt")
    ]
}

const AuthRouter = require('./authorization/routes.config')
const UsersRouter = require('./users/routes.config')
const OrdersRouter = require('./orders/routes.config')

app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
    res.header('Access-Control-Expose-Headers', 'Content-Length')
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range')
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200)
    } else {
        return next()
    }
})

app.use(bodyParser.json())
AuthRouter.routesConfig(app)
UsersRouter.routesConfig(app)
OrdersRouter.routesConfig(app)
app.get('/', (req, res) => {
    res.status(200).send({data: ['You\'ve reached the Shams Errand API']})
})
https.createServer(https_options, app).listen(config.ssl_port, _=> {
    console.log('API SSL is at port %s', config.ssl_port)
})
// app.listen(config.port, _ => {
//     console.log('API Server is listening at port %s', config.port)
// })