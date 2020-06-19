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
const favouritesRouter = require('./routes/favouritesRoute');

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

// Secure traffic only
app.all('*', (req, res, next) => {
  if (req.secure) {
    return next();
  }
  else {
    res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




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




app.use(express.static(path.join(__dirname, 'public')));


app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);
app.use('/imageUpload',uploadRouter);
app.use('/favourites', favouritesRouter);

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
