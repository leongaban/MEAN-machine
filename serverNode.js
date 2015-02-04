// load the express package and create our app
// REQUIRE PACKAGES --------------------------
var express    	= require('express'); 	   	// call express
var app 	   	= express(); 			   	// define our app using express
var bodyParser 	= require('body-parser');   // get body-parser
var morgan 	   	= require('morgan'); 	   	// used to see requests
var mongoose   	= require('mongoose'); 	   	// for working w/ our database
var User 		= require('./app/models/user');
var Product 	= require('./app/models/product');
var port 	   	= process.env.PORT || 8615; // set the port for our app
var jwt 		= require('jsonwebtoken');	// JSON web tokens

var superSecret = 'ilovescotchscotchyscotchscotch'; // JWT secret

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

// Routers
var adminRouter = express.Router();	// for /admin
var apiRouter   = express.Router();	// for APIs

// ROUTES FOR OUR API
// ======================================
apiRouter.get('/', function(req, res) {
	res.json({ message: '••• Welcome to our api! •••' });
});

// route to authenticate a user (POST http://localhost:8615/api/authenticate)
apiRouter.post('/authenticate', function(req, res) {

	// find the user
	// select the name, username and password explicitly
	User.findOne({
		username: req.body.username
	}).select('name username password').exec(function(err, user) {

		if (err) throw err;

		// no user with that username was found
		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User no found.'});
		} else {
			// if user is found and password is right
			// create a token
			var token = jwt.sign({
				name: user.name,
				username: user.username
			}, superSecret, {
				expiresInMinutes: 1440 // expires in 24 hours
			});

			// return the information including token as JSON
			res.json({
				success: true,
				message: 'Enjoy your token!', token: token
			});
		}

	});

});

// route middleware to verify a token
apiRouter.use(function(req, res, next) {
	console.log('••• API hit - verifying token •••');

	// check header of url parameters or post parameters for token
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];

	// decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, superSecret, function(err, decoded) {
			if (err) {
				return res.status(403).send({ success: false, message: 'Failed to authenticate token.' });
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;

				next();
			}
		});

	} else {

		// if there is no token
		// return an HTTP response of 403 (access forbidden) and an error message
		return res.status(403).send({ success: false, message: 'No token provided.' });
	}
});

// api/users
apiRouter.route('/products')

	// create a product (accessed at POST http://localhost:8615/api/products)
	.post(function(req, res) {

		var product = new Product();
		product.productname = req.body.name;
	})

	// get all products (access at GET http://localhost:8615/api/products)
	.get(function(req, res) {
		Product.find(function(err, products) {
			if (err) return res.send(err);

			res.json(products);
		})
});

apiRouter.route('/users')

	// create a user (accessed at POST http://localhost:8615/api/users)
	.post(function(req, res) {

		// create a new instance of the User model
		var user = new User();

		// set the users information (comes from the request)
		user.name = req.body.name;
		user.username = req.body.username;
		user.password = req.body.password;

		// save the user and check for errors
		user.save(function(err) {
			if (err) {
				// duplicate entry
				if (err.code == 11000) 
					return res.json({ success: false, message: 'A user with that username already exists. '});
				else 
					return res.send(err);
			}

			// return a message
			res.json({ message: 'User created!' });
		});

	})

	// get all users (access at GET http://localhost:8615/api/users)
	.get(function(req, res) {
		User.find(function(err, users) {
			if (err) return res.send(err);

			// return the users
			res.json(users);
		})
	});

// api/users/:user_id
apiRouter.route('/users/:user_id')

	// get the user with that id
	// (accessed at GET http://localhost:8615/api/users/:user_id)
	.get(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err) return res.send(err);

			// return that user
			res.json(user);
		});
	})

	// update the user with this id
	.put(function(req, res) {
		// use our user model to find the user we want
		User.findById(req.params.user_id, function (err, user) {

			if (err) return res.send(err);

			// update the users info only if its new
			if (req.body.name) user.name = req.body.name;
			if (req.body.username) user.username = req.body.username;
			if (req.body.password) user.password = req.body.password;

			// save the user
			user.save(function(err) {
				if (err) return res.send(err);

				// return a message
				res.json({ message: 'User updated!' });
			});
		})
	})

	// delete the user with this id
	.delete(function(req, res) {
		User.remove({
			_id: req.params.user_id
		}, function(err, user) {
			if (err) return res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

// api endpoint to get user information 2 
apiRouter.get('/me', function(req, res) { 
	res.send(req.decoded);
});

// PUBLIC ROUTES ------------------------------
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.route('/login')
	// show the form
	.get(function (req, res) {
		res.send('this is the login form');
	})

	// process the form
	.post(function (req, res) {
		console.log('processing');
		res.send('processing the login form');
	});


// ADMIN ROUTES -------------------------------
// route middleware that happens on every request
adminRouter.use(function(req, res, next) {
	console.log(req.method, req.url);

	next();
});

adminRouter.get('/', function(req, res) {
	res.send('I am the Admin page!');
});

// users page /admin/users
adminRouter.get('/users', function(req, res) {
	res.send('I show all the users!');
});

// middleware to validate :name
adminRouter.param('name', function(req, res, next, name) {
	// do validation on name
	// blah blah validation
	// log something
	console.log('doing name validations on ' + name);

	// once validation is done save the new item in the req
	req.name = name;

	next();
});

// route with parameters /admin/users/:name
adminRouter.get('/users/:name', function(req, res) {
	res.send('hello '+req.params.name + '!');
});

// users page /admin/posts
adminRouter.get('/posts', function(req, res) {
	res.send('I show all the posts!');
});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', apiRouter);
app.use('/admin', adminRouter);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('••• Magic happens on port ' + port + '! •••');



/* raw Node */
// // get the http and filesystem modules
// var http = require('http')
// 	fs   = require('fs');

// // create our server using the http module
// http.createServer(function(req, res) {

// 	// write to our server. set configuration for the response
// 	res.writeHead(200, {
// 		'Content-Type': 'text/html',
// 		'Access-Control-Allow-Origin' : '*'
// 	});

// 	// grab the index.html file using fs
// 	var readStream = fs.createReadStream(__dirname + '/index.html');

// 	// send the index.html file to our user
//   	readStream.pipe(res);


// }).listen(1337);

// // tell ourselves what's happening
// console.log('Visit me at http://localhost:1337');