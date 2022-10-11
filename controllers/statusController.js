const User = require('../models/UserModel');
const { body, validationResult } = require('express-validator');

exports.status_update_get = formGET('status_form');

exports.status_update_post = formPOST('gary', 'status_form', 'status');

exports.admin_update_get = formGET('admin_form');

exports.admin_update_post = formPOST('admin', 'admin_form', 'admin');

function formGET(template) {
    return (
        (req, res, next) => {
            User.findById(req.params.id)
                .exec((err, user) => {
                    if (err) return next(err);
        
                    if (user === null) {
                        const err = new Error('User not found');
                        err.status = 404;
                        return next(err);
                    }
                    
                    res.render(template, {
                        user,
                        errors: false,
                        login_errors: false,
                    });
                });
        }
    );
}

function formPOST(password, template, documentField) {
    return (
        [
            body('status')
                .trim()
                .escape()
                .custom((value) => value.toLowerCase() === password)
                .withMessage('Nice try. But NO!'),
            (req, res, next) => {
                // catching validation errors
                const errors = validationResult(req);
        
                if (!errors.isEmpty()) {
                    res.render(template, {
                        user: {
                            _id: req.body.userid,
                        },
                        errors: errors.array(),
                        login_errors: false,
                    });
                    return;
                }
        
                // VIP password is correct
                User.findByIdAndUpdate(req.body.userid, { [documentField]: true }, {}, (err, user) => {
                    if (err) return next(err);
        
                    if (user === null) {
                        const err = new Error('User not found');
                        err.status = 404;
                        return next(err);
                    }
        
                    res.redirect(user.url);
                });
            }
        ]
    );
}
