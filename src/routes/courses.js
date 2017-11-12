'use strict'

const express = require('express'),
			 router = express.Router(),
			 Course = require('../models/course');

// --> api/courses
router.get('/', function(req, res){
	Course.find({},'course_id title', function(err, courses){
        if(err){
            err.status = 400;
            return next(err);
        }
        res.status(200);
        res.json(courses);
    });
});
