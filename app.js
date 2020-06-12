var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

//passsport
var passport = require('passport');
var authenticate = require('./authenticate')

// jwt token 
var config = require('./config');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const dishRouter = require('./routes/dishRoute');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

 const uploadRouter = require('./routes/uploadRouter');

const mongoose = require('mongoose');

const Dishes = require('./models/dishes');


// this is commenthed when we start using JWT token for authentication
//const url = 'mongodb://localhost:27017/conFusion';
const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => { console.log(err); });


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




// removing session while using JWT Token
// app.use(session({
//   name: 'session-id',
//   secret: '12345-67890-09876-54321',
//   saveUninitialized: false,
//   resave: false,
//   store: new FileStore()
// }));


/* explanation for passport usage:
f the user is logged in,
then what happens is that when the session is initiated again,
you recall that when you log in here,
you will be logging in here,
and a call to the passport authenticate local,
when this is done at the login stage,
the passport authenticate local will
automatically add the user property to the request message.
So, it'll add req.user and then,
the passport session that we have done here will automatically
serialize that user information and then store it in the session.
So, and subsequently, whenever
a incoming request comes in from the client side
with the session cookie already in place,
then this will automatically load the req.user onto the incoming request.
So, that is how the passport session itself is organized.
*/

// auth using passport
app.use(passport.initialize());
// commented while using JWT Token to auntheticate
// app.use(passport.session());
app.use('/', indexRouter);
app.use('/users', usersRouter);

// commenting to use jwt token for authorization
/*function auth(req, res, next) {
  console.log(req.user);

  if (!req.user) {
    var err = new Error('You are not authenticated!');
    err.status = 403;
    next(err);
  }
  else {
    next();
  }
}
*/

// use user route to signup and logout a user 
// cookie and session logic
/*
app.use('/', indexRouter);
app.use('/users', usersRouter);

function auth (req, res, next) {
  console.log(req.session);

if(!req.session.user) {
    var err = new Error('You are not authenticated!');
    err.status = 403;
    return next(err);
}
else {
  if (req.session.user === 'authenticated') {
    next();
  }
  else {
    var err = new Error('You are not authenticated!');
    err.status = 403;
    return next(err);
  }
}
}
*/


// cookie logic 

/*app.use(cookieParser('12345-67890-09876-54321'));

function auth (req, res, next) {

  if (!req.signedCookies.user) { // first time when no cookie exists
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');              
        err.status = 401;
        next(err);
        return;
    }
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    if (user == 'admin' && pass == 'password') {
        res.cookie('user','admin',{signed: true});
        next(); // authorized
    } else {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');              
        err.status = 401;
        next(err);
    }
  }
  else {
      if (req.signedCookies.user === 'admin') { // when cookie exists
          next();
      }
      else {
          var err = new Error('You are not authenticated!');
          err.status = 401;
          next(err);
      }
  }
}

*/

// basic auth logic

/*
app.use('/', indexRouter);
app.use('/users', usersRouter);


  
  function auth (req, res, next) {
      console.log(req.session);
  
      if (!req.session.user) {
          var authHeader = req.headers.authorization;
          if (!authHeader) {
              var err = new Error('You are not authenticated!');
              res.setHeader('WWW-Authenticate', 'Basic');                        
              err.status = 401;
              next(err);
              return;
          }
          var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
          var user = auth[0];
          var pass = auth[1];
          if (user == 'admin' && pass == 'password') {
              req.session.user = 'admin';
              next(); // authorized
          } else {
              var err = new Error('You are not authenticated!');
              res.setHeader('WWW-Authenticate', 'Basic');
              err.status = 401;
              next(err);
          }
      }
      else {
          if (req.session.user === 'admin') {
              console.log('req.session: ',req.session);
              next();
          }
          else {
              var err = new Error('You are not authenticated!');
              err.status = 401;
              next(err);
          }
      }
  }

  */

// commented this statement while using JWT to authenticate
//app.use(auth);


app.use(express.static(path.join(__dirname, 'public')));


app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);
app.use('/imageUpload',uploadRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


/*token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWM1ZjA5OTkwMzhhNGEwYTg3NDNiNWIiLCJpYXQiOjE1OTAxMjI3NTgsImV4cCI6MTU5MDEyNjM1OH0.kX-6gLZNiLeMrRkHCZGuKe7Y6e6p6Q7FQVjbbB4LV5s  */