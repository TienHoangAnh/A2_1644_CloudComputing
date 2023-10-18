var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ironmanRouter = require('./routes/ironman');
var transformersRouter = require('./routes/transformers');
var adminpageRouter = require('./routes/adminpage');


var app = express();

var hbs = require('hbs');
hbs.registerHelper('equal', require('handlebars-helper-equal'))

var hbs = require('hbs');
hbs.registerHelper('dateFormat', require('handlebars-dateformat')); 

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

var mongoose = require('mongoose');
mongoose.set('strictQuery', true);
var uri = 'mongodb+srv://ti3n120903:bNpjoTdXcoRswrCc@cluster0.ma3tufb.mongodb.net/GCH1105';
//cần khai báo tên của DB ở trong uri connection string(ex: demo)
// mongoose.connect('mongodb+srv://ti3n120903:bNpjoTdXcoRswrCc@cluster0.ma3tufb.mongodb.net/')
mongoose.connect(uri)
.then(() => console.log('DB connected ok'))
.catch((err) => console.err('DB connect failded'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ironman', ironmanRouter);
app.use('/transformers', transformersRouter);
app.use('/adminpage', adminpageRouter);

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

app.listen(process.env.PORT||3001);
module.exports = app;
