const port = process.env.PORT || 5000;
/*-----------------------------------------------*/
var mongooseSetup = require('./setup-mongo');
var setupPassport = require('./setup-passport');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var userApiRouter = require('./api/v1/user_api');
var userMessageApiRouter = require('./api/v1/user_message_api');
/*---------------GLOBAL, COMMON VARIABLES---------------------*/
//Please notice that the following variables are common and
//are used by all apis.
//Therefore, they are declared only once. 
//YOU ARE NOT ALLOWED TO DECLARE THE VARIABLES SOMEWHERELS!
global.responseClass = require('./src/communication/entity/response');
var dateUtilModule = require('./src/util/date-util/date-util');
var errorResource = require('./src/resource/text/error-message');
var dbExceptionHandler = require('./src/util/mongo-handler/mongo-exception-handler');
var uniformData = require('./src/util/uniform-data/uniform-data');
/*--------------------------------------------------*/
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
app.use('/user_message_api/v1',userMessageApiRouter);
/*----------------- -----------------------*/


app.listen(port, () => console.log('Listening on port ' + port));
/*----------------------------------------------*/


