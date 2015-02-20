// load the express package and create our app
// REQUIRE PACKAGES --------------------------
var express    = require('express'); 	  // call express
var app 	   = express(); 			  // define our app using express
var bodyParser = require('body-parser');  // get body-parser
var morgan 	   = require('morgan'); 	  // used to see requests
var mongoose   = require('mongoose'); 	  // for working w/ our database
var config 	   = require('./config');
var path 	   = require('path');

// var superSecret = 'ilovescotchscotchyscotchscotch'; // JWT secret

// APP CONFIGURATION --------------------------
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests (Cross-Origin Resource Sharing)
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \ Authorization');
	next();
});

// log all requests to the console
app.use(morgan('dev'));

// MongoDB connect
// mongoose.connect('mongodb://localhost/test');  // local test db
mongoose.connect('mongodb://node:noder@novus.modulusmongo.net:27017/Iganiq8o');
// mongoose.connect('mongodb://leongaban:Gabandok712!@kahana.mongohq.com:10016/sandbox');


// API ROUTES ------------------------
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);

var adminRouter = require('./app/routes/api')(app, express);
app.use('/admin', adminRouter);


// MAIN CATCHALL ROUTE ---------------
// SEND USERS TO FRONTEND ------------
// has to be registered after API routes
app.use(express.static(__dirname + '/public'));

// Catch all for routes not handled by Node
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

// START THE SERVER
// =============================================================================
app.listen(config.port);
console.log('••• Magic happens on port ' + config.port + '! •••');
