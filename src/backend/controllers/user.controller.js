const Device = require('../model/device')

exports.userAuth = (req, res) => {
    res.status(200).send({name: 'userboard'});
}

exports.getDataTemp = (req, res) => {
    Device.findOne(
        {type: 'temp'},
        {value: 1,  time: 1, _id: 0}).sort({time: '-1'})
    .then(data => {
        console.log(data)
        return res.status(200).send(data)
    })
    .catch(e => {
        console.log(e)
    })
}

exports.getDataHumid = (req, res) => {
    Device.findOne(
        {type: 'humid'},
        {value: 1, time: 1, _id: 0}).sort({time: '-1'})
    .then(data => {
        console.log(data)
        return res.status(200).send(data)
    })
    .catch(e => {
        console.log(e)
    })
}

exports.getDataLux = (req, res) => {
    Device.findOne(
        {type: 'lux'},
        {value: 1,  time: 1, _id: 0}).sort({time: '-1'})
    .then(data => {
        console.log(data)
        return res.status(200).send(data)
    })
    .catch(e => {
        console.log(e)
    })
}

exports.getLog = (req, res) => {
    Device.findOne({__v: 0}).sort({time: -1})
    .then(data => {
        console.log(data)
        return res.send(data)
    })
    .catch(e => {
        console.log(e)
    })
}