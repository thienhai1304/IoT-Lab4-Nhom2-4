const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI

exports.connect = () => {
    mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Successfully connect to DB !!!')
    })
    .catch((e) => {
        console.log('DB connection falied ...')
        console.log(e)
        process.exit(1)
    })
}