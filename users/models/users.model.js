const mongoose = require('../../common/services/mongoose.service').mongoose
const Schema = mongoose.Schema
const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    tmpPassword: String,
    permissionLevel: Number
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

userSchema.set('toJSON', {
    virtuals: true
})

const userModel = mongoose.model('Users', userSchema)

exports.createUser = (userData) => {
    const user = new userModel(userData)
    return user.save()
}

exports.findById = (id) => {
    return userModel.findById(id).then(result => {
        if(result === null) return null
        result = result.toJSON()
        delete result._id
        delete result.__v
        delete result.password
        return result
    })
}

exports.patchUser = (id, userData) => {
    return new Promise( (resolve, reject) => {
        userModel.findById(id, (err, user) => {
            if(err) reject(err)
            for(let i in userData) {
                user[i] = userData[i]
            }
            user.save( (err, updatedUser) => {
                if(err) return reject(err)
                resolve(updatedUser)
            })
        })
    })
}

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        userModel.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};

exports.removeById = (userId) => {
    return new Promise( (resolve, reject) => {
        userModel.remove({_id: userId}, (err) => {
            if(err) {
                console.log(err)
                reject(err)
                return err
            } else {
                resolve(err)
            }
        })
    })
}

exports.findByEmail = (email) => {
    return userModel.find({email: email})
}