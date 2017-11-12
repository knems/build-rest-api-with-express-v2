'use strict';

// load modules
const express = require('express'),
		 mongoose = require('mongoose'),
		 	 course = require('./models/course'),
			 review = require('./models/review'),
				 user = require('./models/user'),
 			 morgan = require('morgan'),
			  	app = express(),
				 path = require('path'),
	 jsonParser = require('body-parser').json,
	    courses = require('./routes/courses'),
			 seeder = require('mongoose-seeder'),
			   data = require('./data/data.json');

const db = mongoose.connect('mongodb://localhost:27017/test', {
   useMongoClient: true
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('db connected');
	// Drop the entire database (default behaviour)
	seeder.seed(data, {dropDatabase: true}).then(function(dbData) {
	    console.log('seeder has seeded');
			console.log(dbData);
	}).catch(function(err) {
	    console.log(err);
	});


});

// set our port
app.set('port', process.env.PORT || 5000);

// morgan gives us http request logging
app.use(morgan('dev'));

// set up json parser
app.use(jsonParser());

//get the user routes
app.set('/api/courses', courses);

// catch 404 and forward to global error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// Express's global error handler
app.use(function(err, req, res, next) {
	console.log(err.message);
	// res.status(err.status || 500);
  // res.render('error', {
  //   message: err.message,
  //   error: {}
  // });
});

// start listening on our port
var server = app.listen(app.get('port'), function() {
  console.log('Express server is listening on port ' + server.address().port);
});
