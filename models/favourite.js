const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const dish = require('../models/dishes');
const user = require('../models/user');


const favoriteSchema = new Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId, // this is how to link to the reference to the user document
        ref: 'User' // reference to user model .
    },
    dishes: [{ type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'}]
});

var Favourites = mongoose.model('Favourites', favoriteSchema);

module.exports = Favourites;