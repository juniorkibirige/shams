const UserModel = require('../models/users.model');
const crypto = require('crypto');

exports.insert = (req, res) => {
    req.body = req.query
    let salt = crypto.randomBytes(16).toString('base64')
    let hash = crypto.createHmac('sha512', salt)
        .update(req.body.password)
        .digest('base64')
    req.body.password = salt + "$" + hash
    req.body.permissionLevel = 1
    UserModel.createUser(req.body)
        .then((result) => {
            res.status(201).send({ id: result._id })
        })
}

exports.getById = (req, res) => {
    UserModel.findById(req.params.userId).then((result) => {
        if(result == null) res.status(405).send({errors: 'Specified user doesn\'t exist!'})
        else res.status(200).send(result)
    })
}

exports.patchById = (req, res) => {
    req.body = req.query
    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;
    }
    UserModel.patchUser(req.params.userId, req.body)
        .then(result => {
            res.status(204).send({})
        })
}

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ?
        parseInt(req.query.limit) : 10
    let page = 0
    if (req.page) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page)
            page = Number.isInteger(req.query.page) ? req.query.page : 0
        }
    }
    UserModel.list(limit, page).then( result => {
        res.status(200).send(result)
    })
}

exports.removeById = (req, res) => {
    UserModel.removeById(req.params.userId)
    .then( result => {
        console.log(err)
        res.status(204).send(result)
    }).catch(err=>{
        console.log(err)
        res.status(404).send({errors: 'Specified does\'nt exist!'})
    })
}