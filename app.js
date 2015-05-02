var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var mobileindex = require('./routes/mobileindex');
var mobilehistory = require('./routes/mobilehistory');
var mobilewatchselection = require('./routes/mobilewatchselection');
var mobiletimeselection = require('./routes/mobiletimeselection');
var simulate = require('./routes/simulate');
var watchselection = require('./routes/watchselection');
var timeselection = require('./routes/timeselection');
var ping = require('./routes/ping');
var product = require('./routes/product');
var history = require('./routes/history');
var timeline = require('./routes/timeline');
var social = require('./routes/social');
var productmodel = require('./routes/productmodel');
var threedemo = require('./routes/threedemo');
//handle db stuff
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('facetCatalog.sqlite');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/mobileindex', mobileindex);
app.use('/mobilewatchselection', mobilewatchselection);
app.use('/mobiletimeselection', mobiletimeselection);
app.use('/simulate', simulate);
app.use('/watchselection', watchselection);
app.use('/timeselection', timeselection);
app.use('/mobilehistory', mobilehistory);
app.use('/ping', ping);
app.use('/product', product);
app.use('/history', history);
app.use('/timeline', timeline);
app.use('/social', social);
app.use('/threedemo', threedemo);
app.use('/productmodel', productmodel);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.getWatchIDFromTag = function(id, callback){
  db.get("SELECT productInfo.id FROM tags INNER JOIN productInfo ON tags.productid = productInfo.id where tags.productid="+id, function(err, row) {

    app.getProductInfo(row.id,callback);
  });
}

app.getProductInfo = function(tag, callback){
   id=tag || 3;
  db.get("SELECT * FROM productInfo INNER JOIN productDetails ON productInfo.id="+id+" AND productDetails.watchId=productInfo.id", function(err, row) {
    //console.log(row);
    //console.log("getProductInfo:"+row);
    callback(row);
  });
}
app.getDateInfo = function(tag, callback){
   year=tag || 1900;
  db.get("SELECT * FROM timelineBool where year="+year, function(err, row) {

    callback(row);
  });
}
function closeDb() {
    console.log("closeDb");
    db.close();
}


module.exports = app;
