'use strict';

var mongoose = require('mongoose');

var Product = mongoose.model('Product');

// Creating two products to add to ProductDB

const prdt1=new Product({
    productId: "12445dsd234",
    category: "Modile",
    productName: "Samsung",
    productModel: "GalaxyNote",
    price: 700,
    availableQuantity: 10
});

const prdt2=new Product({
    productId: "123245ds4234",
    category: "TV",
    productName: "Sony",
    productModel: "Bravia",
    price: 1200,
    availableQuantity: 6
    
});

const defaultProducts=[prdt1,prdt2];

//inserting the two products into ProductDB
Product.insertMany(defaultProducts,function(err){
    if(err)
        console.log(err)
});


// GET call function to get all products in the ProductDB
exports.getProducts=function(req,res){
    Product.find({},{_id:0},{__v: 0},function(err,product){
        if(err)
            res.send(err);
        res.json(product); // sending products
    });
};