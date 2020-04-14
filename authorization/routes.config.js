const VerifyUserMiddleware = require('./middlewares/verify.user.middleware');
const AuthorizationController = require('./controllers/auth.controller');
const AuthValidationMiddleware = require('../common/middlewares/auth.validation.middleware');

exports.routesConfig = (app) => {
    app.post('/auth', [
        VerifyUserMiddleware.hasAuthValidFields,
        VerifyUserMiddleware.isPasswordAndUserMatch,
        AuthorizationController.login
    ])
}