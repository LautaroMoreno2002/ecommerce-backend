const mongoose = require('mongoose');

// Inicializo el Schema
const productSchema = new mongoose.Schema({
  "brand": String,
  "model": String,
  "release_year": Number,
  "price": Number,
  "osname": String,
  "osversion": String,
  "dimensions": String,
  "weight": Number,
  "specifications": {
    "sizeScreen": String,
    "resolutionScreen": String,
    "typeScreen": String,
    "processor": String,
    "ram": Number,
    "internal_storage": Number,
    "expandable_storage": String,
      "cameraMain": String,
      "cameraFront": String,
      "batteryCapacity": Number,
      "fast_charging": String,
      "wireless_charging": String
  },
  "connectivity": {
    "network_support": String,
    "wifi": String,
    "bluetooth": String,
    "nfc": String,
    "usb_type": String
  },
  "colors": [String],
  "imgSrc": [String]
})

module.exports = mongoose.model('Product', productSchema);