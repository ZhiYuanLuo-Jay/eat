module.exports = function(mongoose){
    var RestaurantSchema = new mongoose.Schema({
        restaurant: { type: String, required: [true, 'Restaurant must have a name'], minlength: [3, "Minimun 3 characters are required"], unique: [true, 'Restaurant name entered exists already.' ]  },
        cuisine: { type: String, required: [true, 'Cuisine must have a name'], minlength: [3, "Minimun 3 characters are required"] },
        review: [{
            customer: { type: String, required: [true, 'You must provide your name'], minlength: [3, "Minimun 3 characters are required"] },
            stars: { type: Number, default: 5 },
            content: { type: String, required: [true, 'You must provide your review'], minlength: [3, "Minimun 3 characters are required"] },
          }],

        }, { timestamps: true })
    mongoose.model('Restaurant', RestaurantSchema); 
}
