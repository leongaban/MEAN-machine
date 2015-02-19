// get the things we need
var express  = require('express');
var app 	 = express();
var path 	 = require('path');
var mongoose = require('mongoose');
var config 	 = require('./config');

// connect to scotch,io's database
mongoose.connect(config.database);

// set the public folder to serve public assets
app.use(express.static(__dirname + '/public'));

// set up our one route to the index.html file
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

app.get('/', function (req, res) {
	console.log('this');
});


app.listen(config.port);
console.log('Magic happens on port ' + config.port);
// app.listen(9999);
// console.log('Magic happens on port 9999.');
