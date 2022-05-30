var mongoose = require("mongoose");
var Schema = mongoose.Schema;
 
var labSchema = new Schema({
  device: String,     // dht || luxsen || led 
  IPaddress: String,
  type: String,       // temp/hum  || lux || 1/2
  value: Number,      // 29/60   || 3000 || 1/0
  time: Date,         // 9:5:6
  board: String  // wemos/raspberry
});

module.exports = mongoose.model('Device', labSchema)