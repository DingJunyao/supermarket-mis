var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var index = require('./routes/index');

var goods = require('./routes/goods');
var supplier = require('./routes/supplier');
var warehouse = require('./routes/warehouse');
var order = require('./routes/order');
var wrecord = require('./routes/wrecord');
var wwarrant = require('./routes/wwarrant');
var misimport = require('./routes/import');
var user = require('./routes/user');
var goodsMenu = require('./routes/goodsMenu');

var app = express();

app.use(cors({
    origin:['http://localhost:8080'],
    methods:['GET','POST','PATCH','PUT','DELETE'],
    alloweHeaders:['Conten-Type', 'Authorization']
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/goods', goods);
app.use('/supplier', supplier);
app.use('/warehouse', warehouse);
app.use('/order', order);
app.use('/wrecord', wrecord);
app.use('/wwarrant', wwarrant);
app.use('/import', misimport);
app.use('/user', user);
app.use('/goodsMenu', goodsMenu);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
