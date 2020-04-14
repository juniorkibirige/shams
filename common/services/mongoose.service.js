const mongoose = require('mongoose')
let count = 0;

const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: 30,
    reconnectInterval: 500,
    poolSize: 10,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: false
}

const connectWithRetry = _ => {
    console.log('MongoDB connection with retry')
    mongoose.connect("mongodb://localhost:27017/shamseshop", options).then( _ => {
        console.log('MongoDB is connected')
    }) .catch(err => {
        console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count)
        setTimeout(connectWithRetry, 5000)
    })
}

connectWithRetry()
exports.mongoose = mongoose