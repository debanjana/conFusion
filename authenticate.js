var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

// using JWT token based authentication
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var config = require('./config.js');


// using passport for auth
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// using jwt for token based authentication
exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey,
        {expiresIn: 3600});
};

var opts = {};
// the jwt token  will be included in the authentication header as a bearer token.
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

// token based auth - so no session - session false
/* verifyUser,
which calls upon the passport authenticate with JWT.
So, this one uses the token that
comes in the authentication header and then verifies the user.
So, anytime I want to verify the user's authenticity,
I can simply call verify user,
and that will initiate the call to the passport.authenticate and verify the sser.
If this is successful,
it will allow me to proceed
*/
exports.verifyUser = passport.authenticate('jwt', {session: false});