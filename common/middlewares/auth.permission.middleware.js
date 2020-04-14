const jwt = require('jsonwebtoken'), secret = require('../config/env.config')['jwt_secret']
const ADMIN_PERMISSION = 4096
exports.minimumPermissionLevelRequired = (rpl) => {
    return (req, res, next) => {
        let upl = parseInt(req.jwt.permissionLevel)
        let uI = req.jwt.userId
        if (upl & rpl) {
            return next()
        } else {
            return res.status(403).send()
        }
    }
}

exports.onlySameUserOrAdminCanDoThisAction = (req, res, next) =>{
    let upl = parseInt(req.jwt.permissionLevel)
    let uI = req.jwt.userId
    if(req.params && req.params.userId === req.params.userId) {
        return next()
    } else {
        if(upl & ADMIN_PERMISSION) {
            return next()
        } else {
            return res.status(403).send()
        }
    }
}

exports.sameUserCantDoThisAction = (req, res, next) => {
    let uI = req.jwt.userId
    if(req.params.userId !== uI) {
        return next()
    } else {
        return res.status(400).send()
    }
}