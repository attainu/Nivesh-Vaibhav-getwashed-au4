var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let session = require('express-session');

var clothRouter = require('./routes/cloth.route.js');
 var orderRouter = require('./routes/order.route.js');
var userRouter = require('./routes/user.route.');

const dbCoonecction = require('./Database/dbConnection');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
      name: "loundry_app",
      key: "user_sid",
      secret: "somerandonstuffs",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 2 * 60 * 1000,
        path: "/",
        sameSite: true,
        secure: false
      }
    })
  );


  app.use('/cloth', clothRouter);
 app.use('/order', orderRouter);
app.use('/user', userRouter);


module.exports = app;
