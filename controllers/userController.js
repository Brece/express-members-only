const User = require('../models/UserModel');
const Image = require('../models/ImageModel');

const async = require('async');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

//  User detail
// TODO:
exports.user_detail_get = (req, res, next) => {
    User.findById(req.params.id)
        .populate('image')
        .exec((err, user) => {
            if (err) return next(err);

            if (user === null) {
                const err = new Error('User not found');
                err.status = 404;
                return next(err);
            }

            res.render('user_detail', {
                title: 'My Profile',
                user,
            });
    });
}

// SIGN UP
exports.user_signup_get = (req, res, next) => {
    Image.find({}, (err, image_list) => {
        if (err) return next(err);

        res.render('user_form', {
            title: 'Sign Up',
            user: false,
            image_list,
            errors: false,
            update: false,
        });
    });
}

// TODO: check for color and image id
// TODO: get rid of database check if email is in use; passport should handle those cases
exports.user_signup_post = [
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
        .normalizeEmail()
        .withMessage('Please provide a valid email address')
        .custom( async (value) => {
            try {
                const user = await User.findOne({ email: value }, 'email');
                if (user) {
                    return Promise.reject('The email address is already registered');
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
                    update: false,
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
                
                req.flash('success_msg', 'You are now registered and can log in');
                res.redirect('/user/login');
            });
        });
    }
];

// UPDATE
exports.user_update_get = (req, res, next) => {
    async.parallel(
        {
            user(callback) {
                User.findById(req.params.id)
                    .populate('image')
                    .exec(callback);
            },
            list_images(callback) {
                Image.find().exec(callback);
            }
        },
        (err, results) => {
            if (err) return next(err);

            // no results
            if (results.user === null) {
                const err = new Error('User not found');
                err.status = 404;
                return next(err);
            }

            // set selected image
            for (const image of results.list_images) {
                if (image._id.toString() === results.user.image._id.toString()) {
                    image.selected = true;
                }
            };
            // success; render user form for update
            res.render('user_form', {
                title: 'Update Profile',
                user: results.user,
                image_list: results.list_images,
                errors: false,
                update: true,
            });
        }
    );
}

// TODO:
exports.user_update_post = [
    // validation and sanitization
    body('firstname', 'First name is required')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('lastname', 'Last name is required')
        .trim()
        .isLength({ min: 1 })
        .escape(),
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
            color: req.body.color,
            image: req.body.image,
            status: req.body.status,
            _id: req.body.userid,
        });

        // catching validation errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // there are errors; re-render form with given input values
            async.parallel(
                {
                    user(callback) {
                        User.findById(req.body.userid)
                            .exec(callback);
                    },
                    list_images(callback) {
                        Image.find().exec(callback);
                    }
                },
                (err, results) => {
                    if (err) return next(err);
                    
                    // set selected image
                    for (const image of results.list_images) {
                        if (image._id.toString() === req.body.image) {
                            image.selected = true;
                        }
                    };
                    
                    // set registered email address from database
                    user.email = results.user.email;

                    res.render('user_form', {
                        title: 'Update Profile',
                        user,
                        image_list: results.list_images,
                        errors: errors.array(),
                        update: true,
                    });
                }
            );
            return;
        };

        // data is valid; save new document
        // hash password
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) return next(err);

            user.password = hashedPassword;
            
            User.findByIdAndUpdate(
                req.body.userid,
                user,
                {},
                (err, theuser) => {
                    if (err) return next(err);

                    req.flash('success_msg', 'Your profile has been updated successfully');
                    res.redirect(theuser.url);
                });
        });
    }
];

// LOG IN
exports.user_login_get = (req, res, next) => {
    res.render('login_form', {
        title: 'Log In',
        user: false,
        errors: false,
    });
}

// LOG OUT
exports.user_logout_get = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        
        res.flash('success_msg', 'You are successfully logged out');
        res.redirect('/user/login');
    });
}
