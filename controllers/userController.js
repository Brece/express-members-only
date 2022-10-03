const User = require('../models/UserModel');
const Image = require('../models/ImageModel');

const async = require('async');
const { body, validationResult, check } = require('express-validator');

exports.user_create_get = (req, res, next) => {
    Image.find({}, (err, image_list) => {
        if (err) return next(err);

        res.render('user_form', {
            title: 'Sign Up',
            user: false,
            image_list,
        });
    });
}

exports.user_create_post = [
    check('firstname', 'First name is required')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    check('lastname', 'Last name is required')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    check('email')
        .trim()
        .escape()
        .isEmail()
        .withMessage('Please provide a valid email address')
    

];
