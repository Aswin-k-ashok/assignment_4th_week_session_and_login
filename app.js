var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const hbs =require('express-handlebars')

var usersRouter = require('./routes/users');

var app = express();



// view engine setup
app.set('view', path.join(__dirname, 'view'));
app.set('view engine', 'hbs');

app.engine('hbs',hbs({
  extname:'hbs',
  defaultLayout: 'layout',
  layoutsDir:__dirname + '/view/layout',
  partialsDir:__dirname + '/views/partials'
}));



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//session 
app.use(session({secret: "Key", cookie: {maxAge: 6000000}}))

app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;