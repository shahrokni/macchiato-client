const port = process.env.PORT || 5000;
/*-----------------------------------------------*/
var setupMongoose = require('./setup-mongo');
var setupPassport = require('./setup-passport');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var userApiRouter = require('./api/v1/user_api');
var userMessageApiRouter = require('./api/v1/user_message_api');

/*---------------GLOBAL AND COMMON VARIABLES---------------------*/
//Please notice that the following common and global variables are used by all apis.
//THEREFORE, THEY ARE DECLARED ONLY ONCE! 
//YOU ARE NOT ALLOWED TO DECLARE THE VARIABLES SOMEWHERELS!
global.responseClass = require('./src/communication/entity/response');
global.dateUtilModule = require('./src/util/date-util/date-util');
global.errorResource = require('./src/resource/text/error-message');
global.dbExceptionHandler = require('./src/util/mongo-handler/mongo-exception-handler');
global.uniformData = require('./src/util/uniform-data/uniform-data');
/*--------------------------------------------------*/
const app = express();
setupMongoose();
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


