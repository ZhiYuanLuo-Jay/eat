const mongoose = require('mongoose'), 
Restaurant = mongoose.model('Restaurant');

const restaurants = require('../controllers/restaurants.js')

module.exports = function(app){

    //  root
    app.get('/restaurants', function(req, res){
        restaurants.index(req, res);
    });

    // create
    app.post('/restaurant/', function(req, res){
        restaurants.create(req, res);
    });

    // show
    app.get('/restaurant/:id/', function(req, res){
        restaurants.show(req, res);
    });

    // show review
    app.get('/reviews/:id/', function(req, res){
        restaurants.all(req, res);
    });

    // remove
    app.delete('/restaurant/:id', function(req, res){
        restaurants.remove(req, res);
    });

     // update
     app.put('/restaurant/', function(req, res){
        console.log("I am at routes.js - update");
        restaurants.update(req, res);
    });

    // update
    app.put('/review/', function(req, res){
        console.log("I am at routes.js - update");
        restaurants.review(req, res);
    });
}        