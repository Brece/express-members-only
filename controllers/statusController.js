const User = require('../models/UserModel');
const { body, validationResult } = require('express-validator');

exports.status_update_get = (req, res, next) => {
    User.findById(req.params.id)
        .exec((err, user) => {
            if (err) return next(err);

            res.render('status_form', {
                title: '💎 VIP Area 💎',
                user,
                errors: false,
            });
        });
}

exports.status_update_post = [
    body('vip')
        .trim()
        .escape()
        .custom((value) => value.toLowerCase() === 'gary')
        .withMessage('Nice try. But NO!'),
    (req, res, next) => {
        // catching validation errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('status_form', {
                title: '💎 VIP Area 💎',
                user: {
                    _id: req.body.userid,
                },
                errors: errors.array(),
            });
            return;
        }

        // VIP password is correct
        User.findByIdAndUpdate(req.body.userid, { status: true }, {}, (err, user) => {
            if (err) return next(err);

            res.redirect(user.url);
        });
    }
]