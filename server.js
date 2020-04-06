var mongooseSetup = require('./setup-mongo');
var setupPassport = require('./setup-passport');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var userApiRouter = require('./api/v1/user_api');
/*----------------------------------------*/
const port = process.env.PORT || 5000;
/*-------------------------------------------------*/
mongooseSetup.connect();
const app = express();
setupPassport();
/*--------------------- APP USE --------------------*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: "!SFT#$%S\<DDFW#R@19FDC>/23WF%@212$%#!",
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

/*----------------- ROUTERS----------------*/
app.use('/user_api/v1', userApiRouter);
/*----------------- -----------------------*/


app.listen(port, () => console.log('Listening on port ' + port));
/*----------------------------------------------*/


