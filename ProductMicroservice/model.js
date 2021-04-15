'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema for ProductDB
var ProductSchema = new Schema({
  productId: {
    type: String,
  },
  category: {
    type: String,
  },
  productName: {
    type: String,
  },
  productModel: {
    type: String,
  },
  price: {
    type: Number,
  },
  availableQuantity: {
    type: Number,
  }
},{ versionKey: false });


module.exports = mongoose.model('Product', ProductSchema);