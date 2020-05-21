var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// passport 
var passportLocalMongoose = require('passport-local-mongoose');

// username and password will be added by the plugin
/* using passport this is how the user is saved in db
So, you can see that in the database itself,
the password is not directly stored inside
the hashed value of the password which is hashed using this salt key here, 
no password is saved
salt and hash is used 

	"_id" : ObjectId("5ec5f0999038a4a0a8743b5b"),
	"admin" : false,
	"username" : "deb",
	"salt" : "1c746218c0c3bf28f72a4........1af", // no password
	"hash" : "472742374029.........",
    "__v" : 0
    
    */

var User = new Schema({
  admin:   {
      type: Boolean,
      default: false
  }
});

// var User = new Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password:  {
//         type: String,
//         required: true
//     },
//     admin:   {
//         type: Boolean,
//         default: false
//     }
// });

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);