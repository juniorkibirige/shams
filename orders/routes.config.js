const OrdersController = require('./controllers/orders.controller')
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware')
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware')

exports.routesConfig = (app) => {
    app.post('/orders', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.onlySameUserCanDoThisAction,
        OrdersController.addOrder
    ])
    app.get('/orders/:id', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.onlySameUserCanDoThisAction,
        OrdersController.getOrder
    ])
}
