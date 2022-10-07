const Message = require('../models/MessageModel');
const User = require('../models/UserModel');

const async = require('async');
const { body, validationResult } = require('express-validator');

// getting message list for index page is handled by routing in routes/index.js

// CREATE
// no GET method for create because form is a partial template
exports.message_create_post = [
    body('title', 'Title is required')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('text', 'Text message is required')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (req, res, next) => {
        const message = new Message({
            title: req.body.title,
            text: req.body.text,
            user: req.user._id.toString(),
        });

        // catch validation errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // get path to render different templates
            const pathname = new URL(req.headers.referer).pathname;

            pathname === '/' 
            ? res.redirect('/')
            : res.redirect(`/user/${req.user._id.toString()}`);
            return;
        }
        
        // valid data; save document
        message.save((err) => {
            if (err) return next(err);

            res.redirect('/');
        });
    }
]

// DELETE
exports.message_delete_get = (req, res, next) => {
    res.send('xxx');
}

exports.message_delete_post = (req, res, next) => {
    res.send('xxx');
}