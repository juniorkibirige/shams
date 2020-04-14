const config = require('./common/config/env.config.js')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const AuthRouter = require('./authorization/routes.config')
const UsersRouter = require('./users/routes.config')

app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
    res.header('Access-Control-Expose-Headers', 'Content-Length')
    res.header('Access-Control-Allow-Header', 'Accept, Authorization, Content-Type, X-Requested-With, Range')
    if (req.method === 'OPTIONS') {
        return res.send(200)
    } else {
        return next()
    }
})

app.use(bodyParser.json())
AuthRouter.routesConfig(app)
UsersRouter.routesConfig(app)

app.listen(config.port, _ => {
    console.log('API Server is listening at port %s', config.port)
})