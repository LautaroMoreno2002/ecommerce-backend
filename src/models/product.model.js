const mongoose = require('mongoose');

// Inicializo el Schema
const productSchema = new mongoose.Schema({
  "brand": String,
  "model": String,
  "release_year": Number,
  "price": Number,
  "os": {
    "name": String,
    "version": String
  },
  "dimensions": "151.7 x 71.2 x 7.9 mm",
  "weight": Number,
  "specifications": {
    "screen": {
      "size": Number,
      "resolution": String,
      "type": String
    },
    "processor": String,
    "ram": Number,
    "internal_storage": Number,
    "expandable_storage": Boolean,
    "camera": {
      "main": String,
      "front": String
    },
    "battery": {
      "capacity": Number,
      "fast_charging": Boolean,
      "wireless_charging": Boolean
    }
  },
  "connectivity": {
    "network_support": String,
    "wifi": String,
    "bluetooth": String,
    "nfc": Boolean,
    "usb_type": String
  },
  "colors": []
})

module.exports = mongoose.model('Product', productSchema);