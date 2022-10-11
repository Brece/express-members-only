const express = require('express');
const router = express.Router();
const async = require('async');
const mongoose = require('mongoose');

const Message = require('../models/MessageModel');
const User = require('../models/UserModel');

router.get('/', (req, res, next) => {
    async.parallel(
        {
            user(callback) {
                User.findById(req.user ? req.user._id.toString() : mongoose.Types.ObjectId())
                    .populate('image')
                    .exec(callback);
            },
            message_list(callback) {
                Message.find({})
                    .sort({ 'createdAt': 'descending' })
                    .populate({
                        path: 'user',
                        populate: {
                            path: 'image',
                        }
                    })
                    .exec(callback);
            }
        },
        (err, results) => {
            if (err) next(err);
            // message list is an array of objects or an empty array if there are no messages in the database
            res.render('index', {
                title: 'Members Only',
                user: results.user,
                message_list: results.message_list,
                message: false,
                errors: false,
                login_errors: false,
            });
        }
    )
});

module.exports = router;
