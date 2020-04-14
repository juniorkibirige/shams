const UserModel = require('../../users/models/users.model')
const crypto = require('crypto')

exports.hasAuthValidFields = (req, res, next) => {
    let errors = Array()
    req.body = req.query
    if(req.body) {
        !req.body.email ? errors.push('Missing email field!') : null
        !req.body.password ? errors.push('Missing password field!') : null
        return errors.length ? res.status(400).send({errors: errors.join(',')})
        : next()
    } else {
        return res.status(400).send({errors: 'Missing email and password fields'})
    }
}

exports.isPasswordAndUserMatch = (req, res, next) => {
    req.body = req.query
    UserModel.findByEmail(req.body.email)
    .then( user => {
        if(!user[0]){
            res.status(404).send({errors: ['User not found']})
        } else {
            let passwordFields = user[0].password.split('$')
            let salt = passwordFields[0]
            let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64')
            if(hash === passwordFields[1]) {
                req.body = {
                    userId: user[0]._id,
                    email: user[0].email,
                    permissionLevel: user[0].permissionLevel,
                    provider: 'email',
                    name: user[0].firstName + ' ' + user[0].lastName
                }
                return next()
            } else {
                return res.status(400).send({errors: ['Invalid email or password']})
            }
        }
    })
}