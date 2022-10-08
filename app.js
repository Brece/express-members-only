require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const favicon = require('express-favicon');

// passport config
const passport = require('passport');
require('./config/passport')(passport);

// database
const connectDB = require('./database/connection');
connectDB();

const userRouter = require('./routes/users');
const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Express session
app.use(session({
  secret: process.env.SESSION_SECRET || 'only cats',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.authenticate('session'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// passport middlewares: initializing
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

/**
 * use "locals" object to store information that is accessable throughout the entire app
 * place this between passport.initialize() and rendering the views and the currentUser variable is available in all views; you don't have to manually pass it into all of the controllers in which it is needed
 */
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

app.use('/', indexRouter);
app.use('/user', userRouter);

app.use(favicon('public/images/favicons/favicon.ico'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    user: req.user,
  });
});

module.exports = app;
