'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema for CartItemDB
var CartSchema = new Schema({
    productId: {
      type: String,
    },
    productName: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    amount: {
      type: Number,
    }
  },{ versionKey: false }
);

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
  },{ versionKey: false }
);

// connection to ProductDB database
var conn1=mongoose.createConnection('mongodb://localhost/ProductDB');

// connection CartItemDB database
var conn2=mongoose.createConnection('mongodb://localhost/CartItemDB'); 

var Product=conn1.model('Product', ProductSchema);

var CartItem=conn2.model('CartItem', CartSchema);

// Adding an item into CartItemDB to check the case for already existing item
const cartItem1=new CartItem({
    productId: "12445dsd234",
    productName: "Samsung",
    quantity: 1,
    amount: 700
});

const defaultItems=[cartItem1];

//inserting item into CartItemDB
CartItem.insertMany(defaultItems,function(err){
    if(err)
        console.log(err)
});

// PUT call function to add/update items in CartItemDB
exports.putCartItems=function(req,res){

    var uuid=req.params.uuid; // getting userId for validation check
    var id=req.body.productId; // body parameter 'productId' from PUT request
    var quant=req.body.quantity; // body parameter 'quantity' from PUT request

    // User Validation check: Two users are hardcoded
    if(uuid=='qa-test-user' || uuid=='qb-test-user'){ 
        // to find the product in the ProductDB 
        Product.findOne({productId:id}).exec(function(err,product){
            if(err)
                res.send(err);
            // if product exists in ProductDB
            if(product!=null){
              // if sufficient quantity of product is available from ProductDB
              if(quant<=product.availableQuantity){
                  // to find the product in CartItemDB
                  CartItem.findOne({productId:id}).exec(function(err,cartitem){
                      if(err)
                          res.send(err);
                      // if cartitem exists in CartItemDB
                      if(cartitem!=null){
                          quant=Number(quant)+Number(cartitem.quantity);
                          // updating the quantity of that cartitem in CartItemDB
                          CartItem.findOneAndUpdate({productId:id},{quantity:quant},{new:true}).exec(function(err,cartitem){
                            if(err)
                              res.send(err);
                            res.json(cartitem); // sending updated item
                          });
                      }
                      // if cartitem does not exist in CartItemDB
                      else{
                          // creating new CartItem and Adding it to CartItemDB
                          const newItem=new CartItem({
                              productId: id,// id value from body parameter
                              productName: product.productName ,// name of product from ProductDB
                              quantity: quant, // quantity value from body parameter
                              amount: product.price // price of product from ProductDB,
                          });
                          newItem.save(); // save the new item into CartItemDB
                          res.json(newItem); // sending added item
                      }
                  });
              }
              // if sufficient quantity of product not available
              else{
                  res.send('Sufficient Product quantity is Not Available');
              }
            }
            // if product not found in ProductDB 
            else{
              res.send('Product not found in product database')
            }
        });
    }
    // if wrong userID is given
    else{
        res.send('Wrong User ID given');
    }
};


// GET call function to retrieve items in the cart
exports.getCartItems=function(req,res){

    var uuid=req.params.uuid;// getting userId for validation check

    // User Validation check: Two users are hardcoded
    if(uuid=='qa-test-user' || uuid=='qb-test-user'){
            // to find items in the cart
            CartItem.find({},function(err,cartitem){
                if(err)
                    res.send(err);
                res.send(cartitem); // sending items in the cart
            });
    }
    // if wrong userID is given
    else{
        res.send('Wrong User ID given');
    }
};


