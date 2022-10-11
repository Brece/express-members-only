const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const User = require('../models/UserModel');

module.exports = (passport) => {
    // authentication
    passport.use(
        new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
            },
            (req, email, password, done) => {
            User.findOne({ email: email }, (err, user) => {
                if (err) {
                    return done(err);
                }
                
                // clear old failure messages
                req.session.messages = [];
                
                if (!user) {
                    return done(null, false, { message: 'Email incorrect' });
                }
                bcrypt.compare(password, user.password, (err, res) => {
                    if (res) {
                        // passwords match; log in user
                        return done(null, user);
                    } else {
                        // passwords do not match
                        return done(null, false, { message: 'Password incorrect' });
                    }
                });
            })
        })
    );
    
    // session and serialization
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}