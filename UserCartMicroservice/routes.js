'use strict';

const controller = require('./controller');

module.exports = function(app){
    app.route('/rest/v1/users/:uuid/cart')
        .put(controller.putCartItems)  // PUT request
        .get(controller.getCartItems)   // GET request
};


