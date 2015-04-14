var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var simulate = require('./routes/simulate');
var ping = require('./routes/ping');
var product = require('./routes/product');
//handle db stuff
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('facetCatalog.sqlite');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/simulate', simulate);
app.use('/ping', ping);
app.use('/product', product);
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


 function queryDB(id){
   var title;
   console.log("querydb");
   runQuery(updateProduct);
  function runQuery(callback){
            db.each("SELECT tagID AS id, productTitle FROM tagInfo where tagID="+id, function(err, rows){
                if (err){
                    // call your callback with the error
                    callback(err);
                    //return;
                }
                // call your callback with the data
        console.log(rows);
                callback(null, rows);
                //return;
            });
        }

 }
 function updateProduct(err,rows){
   console.log(rows);
   console.log("in update product");
   if(err) console.log("error with message");
   else{
   console.log(rows.id + ": " + rows.productTitle);
        title=rows.productTitle;
        console.log("queryDB:Title:"+title);
      var messageData = {
      title: "title for "+title
      };
      io.sockets.in('room1').emit('select', messageData);
    }
}
function closeDb() {
    console.log("closeDb");
    db.close();
}


module.exports = app;
