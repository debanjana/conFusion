const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;


// comment schema in usual times
/*
var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    author:  {
        type: String,
        required: true
    }
}, {
    timestamps: true // we can have Mongoose automatically insert
    //     timestamps into our model.
    //     So, right there we can just set up the flag time stamps: true.
    //     So, this will automatically add the created at and updated at,
    //     two timestamps into each document that is stored
    //     in our application and it'll automatically update these values.
    //     Whenever we update the document and the created at will be automatically
    //     initialized when the document is first creator of this time.
});
*/

// comment  schema while using mongoose polulation
var commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, // this is how to link to the reference to the user document
        ref: 'User' // reference to user model .
    }
}, {
    timestamps: true
});

  /*So, this way, we are now going to be
connecting this author field and this author field will
simply store a reference to the ID of the user document,
instead of storing the details about the author in the form of a name. */

const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    // always define the schema being used here before calling it here 
    comments: [commentSchema]
}, {
    timestamps: true
});


var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;