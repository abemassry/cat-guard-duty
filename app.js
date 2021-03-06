
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');
var app = express();

var redis = require('redis'),
	client = redis.createClient();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.post('/callback', routes.handleNinjaCallback);
app.post('/', routes.handleNinjaCallback);

app.get('/status', function(req, res) {
  var body = null;

   client.get('detectImage', function(err, reply) {
		body = '<img src="/img/detectedImage.jpg">';
		res.setHeader('Content-Type', 'text/html');
  		res.setHeader('Content-Length', body.length);
  		res.end(body);
   });

});

app.get('/setStatus', function(req, res) {
	client.set('threatLevel', 1);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
