const User = require('../models/UserModel');
const Image = require('../models/ImageModel');

const async = require('async');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

exports.user_create_get = (req, res, next) => {
    Image.find({}, (err, image_list) => {
        if (err) return next(err);

        res.render('user_form', {
            title: 'Sign Up',
            user: false,
            image_list,
            errors: false,
        });
    });
}

// TODO: check for color and image id
exports.user_create_post = [
    // validation and sanitization
    body('firstname', 'First name is required')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('lastname', 'Last name is required')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email address')
        .custom( async (value) => {
            try {
                const user = await User.findOne({ email: value }, 'email');
                if (user) {
                    return Promise.reject('The email address is already in use');
                }
                return true;
            } catch (err) {
                throw new Error(err);
            }
        }),
    body('password', 'Password is required')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('confirmPassword', 'ConfirmPassword field value must match with with Password field value')
        .trim()
        .escape()
        .custom((value, { req }) => value === req.body.password),
    (req, res, next) => {
        // create new user object
        const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            color: req.body.color,
            image: req.body.image,
        });

        // catching validation errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // there are errors; re-render form with given input values
            Image.find({}, (err, image_list) => {
                if (err) return next(err);

                // set selected image
                for (const image of image_list) {
                    if (image._id.toString() === req.body.image) {
                        image.selected = true;
                    }
                };

                res.render('user_form', {
                    title: 'Sign Up',
                    user,
                    image_list,
                    errors: errors.array(),
                });
            });
            return;
        };

        // data is valid; save new document
        // hash password
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) return next(err);

            user.password = hashedPassword;
            
            user.save((err) => {
                if (err) return next(err);
                
                res.redirect(user.url);
            });
        });
    }
];
