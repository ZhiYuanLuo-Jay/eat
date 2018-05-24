const mongoose = require('mongoose'),
Restaurant = mongoose.model('Restaurant');

module.exports = 
{
    index: function(req, res){
        Restaurant.find({}, function(err, restaurants){
            if(err){
                console.log("Returned error", err);
                res.json({message: "Error", error: err})
            }
            else {
                res.json({message: " Show all, Success", data: restaurants})
            }
        })
    },

    create: function(req, res){
        var restaurant = new Restaurant();
        console.log(req.body); // for using the submit form, we use req.body not req.params
        restaurant.restaurant = req.body.restaurant;
        restaurant.cuisine = req.body.cuisine;
        restaurant.save(function(err, restaurant){
            if(err){
                // console.log("Returned error", err);
                res.json({message: "Error", error: err});
            }
            else
            {
                res.json({message:"New restaurant added", data: restaurant});
            }
        })
    },

    show: function(req, res){
        // console.log('req.parmas', req.params);
        Restaurant.findOne({_id: req.params.id}, function(err, data){
            if(err){
                console.log("Got an error", err.message);
                res.json({message: "Error", error: err});
            } else if(!data) {
                res.json({message: "MongoDB could not find one."});
            }
            else {
                res.json({message:"Success find one restaurant", info:data});
            }
        })
    },

    all: function(req, res){
        console.log('all --> req.parmas', req.params);
        Restaurant.findOne({_id: req.params.id}, function(err, data){
            console.log("data ---> ", data);
            if(err){
                console.log("Got an error", err.message);
                res.json({message: "Error", error: err});
            } else if(!data) {
                res.json({message: "MongoDB could not find one."});
            }
            else {
                res.json({message:"Success find one restaurant", info:data})
            }
        }).sort({'data.review.stars':-1})
    },

    remove: function(req, res){
        Restaurant.remove({_id: req.params.id}, function(err, data){
            if(err){
                console.log("Got an error", err.message);
                res.json({message: "Error", error: err});
            } else {
                res.json({message:"Success", info:data});
            }
        })
    },
    
    update: function(req, res){
        console.log('req.body', req.body);
        Restaurant.findOne({_id: req.body.id}, function(err, data){
            if(err){
                console.log("Got an error", err.message);
                res.json({message: "Error", error: err});
            } else if(!data) {
                res.json({message: "MongoDB could not find one."});
            } else {
                data.restaurant = req.body.restaurant;
                data.cuisine = req.body.cuisine;
                data.save(function(err){
                    if(err){
                        console.log("Got an error", err.message);
                        res.json({message: "Error", error: err});
                    } else {
                        res.json({message:"Success", info:data});
                    }
                })
            }
        })
    },

    review: function(req, res){
        console.log('Review --> req.body', req.body);
        Restaurant.findOne({_id: req.body.restID}, function(err, data){
            if(err){
                console.log("Got an error", err.message);
                res.json({message: "Error", error: err});
            } else if(!data) {
                res.json({message: "MongoDB could not find one."});
            } else {
                obj = {
                    customer: req.body.customer,
                    stars: req.body.stars,
                    content: req.body.content
                }
                data.review.push(obj);
                data.save(function(err, data){
                    if(err){
                        console.log("Got an error", err.message);
                        res.json({message: "Error", error: err});
                    } else {
                        res.json({message:"Success", info:data});
                    }
                })
            }
        })
    },

}

