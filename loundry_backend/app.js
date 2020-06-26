var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressRateLimit = require('express-rate-limit');

// let session = require('express-session');

var clothRouter = require('./routes/cloth.route.js');
var orderRouter = require('./routes/order.route.js');
var userRouter = require('./routes/user.route.js');
var ironRouter = require('./routes/iron.route.js');
var washRouter = require('./routes/wash.route.js');
var dryCleanRouter = require('./routes/dryClean.route.js');
let actionRouter = require('./routes/action.route');

var app = express();
app.set('trust proxy', 1);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(
//     session({
//       name: "loundry_app",
//       key: "user_sid",
//       secret: "somerandonstuffs",
//       resave: false,
//       saveUninitialized: false,
//       cookie: {
//         httpOnly: true,
//         maxAge: 2 * 60 * 1000,
//         path: "/",
//         sameSite: true,
//         secure: false
//       }
//     })
//   );
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'build')));

    app.get('/*',(req,res)=>{
       res.sendFile(path.join(__dirname+'/build/index.html'))
    });
}

app.use('/cloth', clothRouter);
app.use('/order', orderRouter);
app.use('/user', userRouter);
app.use('/iron', ironRouter);
app.use('/wash',washRouter);
app.use('/dryClean',dryCleanRouter);
app.use('/action',actionRouter);



module.exports = app;
