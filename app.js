
/**
 * This app can be tested using curl (pg 150, Learning Node, O'Reilly)
 */

/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , map = require('./maproutecontroller');

var app = express();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.directory(__dirname + '/public'));
  app.use(function (req, res, next) {
    throw new Error (req.url + ' not found');
  });
  app.use(function (err, req, res, next) {
    console.log (err);
    res.send (err.message);
  });
});

/**
 * The first parameter, 'development', specifies the environment 
 * for which the settings apply. The environment is specified by the
 * NODE_ENV='x' environment variable. Set using 'export NODE_ENV=x' in
 * the shell.
 */
app.configure('development', function(){
  app.set('port', process.env.PORT || 80);
  app.use(express.errorHandler());
});

app.configure('production', function() {
  app.set('port', process.env.PORT || 80);
});

app.get('/', routes.index);
var prefixes = ['spots'];

// map route to controller
prefixes.forEach (function (prefix) {
  map.mapRoute(app, prefix);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
