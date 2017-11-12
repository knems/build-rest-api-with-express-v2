'use strict'

const mongoose = require('mongoose');
const emailValidator = require('validator').isEmail;

const UserSchema = new mongoose.Schema({
	fullName: {
        type: String,
        required: 'FullName is required',
    },
    emailAddress: {
        type: String,
        required: 'Email address is required',
        unique: 'Email address must be unique',
        validate: { validator: emailValidator, message: '{VALUE} is not a valid email', isAsync: false  }
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
});

const User = module.exports = mongoose.model('User', UserSchema);
