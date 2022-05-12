var createError = require('http-errors');
var express = require('express');
require("dotenv").config();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressValidator = require('express-validator');
var cors = require('cors');
const helmet = require('helmet');

const db = require('./common/db')();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(helmet());
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log("middleware: ", err);
  if (err.status) {
    let body = {
      message: err.message || "Unknown Error",
    };

    if (err.errorCode) {
      body.errorCode = err.errorCode;
    }
    body.error = true;


    res.status(err.status).json(body);
  } else {
    if ( err.name == 'TokenExpiredError' ) {
      res.status(401).json({
        message: 'Token Expired',
        errorCode : 401
      });
    } 
    else {
      res.status(500).json({
        message: 'There is some error, please try again later.',
        errorCode : err.unknown
      });
    }
  }
});

module.exports = app;
