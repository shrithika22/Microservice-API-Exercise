'use strict';

const controller = require('./controller');

module.exports = function(app){
    app.route('/rest/v1/products')
        .get(controller.getProducts); // GET request
};



