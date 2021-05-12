const port = process.env.PORT || 5000;
/*-----------------------------------------------*/
var setupMongoose = require('./setup-mongo');
var setupSocketNewMessage = require('./setup-socket-new-message-notification');
var setupPassport = require('./setup-passport');
var setupRegisterEvents = require('./setup-register-events');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var userApiRouter = require('./api/v1/user_api');
var userMessageApiRouter = require('./api/v1/user_message_api');
var adminQuestionApiRouter = require('./administrator_api/v1/adminstrator_question_api');
var introducerRouter = require('./api/v1/introducer_api');
var termofuseRouter = require('./api/v1/termofuse_api');
var adminIntroducerRouter = require('./administrator_api/v1/administrator_introducer_api');
var adminTermOfUseRouter = require('./administrator_api/v1/administrator_termofuse_api');
var adminUserMessageRouter = require('./administrator_api/v1/administrator_user_message_api');
var aboutUsRouter = require('./api/v1/aboutus_api');
/*---------------GLOBAL AND COMMON VARIABLES---------------------*/
//Please notice that the following common and global variables are used by all apis.
//THEREFORE, THEY ARE DECLARED ONLY ONCE! 
//YOU ARE NOT ALLOWED TO DECLARE THE VARIABLES SOMEWHERELS!
global.responseClass = require('./src/communication/entity/response');
global.dateUtilModule = require('./src/util/date-util/date-util');
global.errorResource = require('./src/resource/text/error-message');
global.dbExceptionHandler = require('./src/util/mongo-handler/mongo-exception-handler');
global.uniformData = require('./src/util/uniform-data/uniform-data');
global.systemMessages = require('./src/resource/text/system-message');
/*--------------------------------------------------*/
const app = express();
setupMongoose();
setupPassport();
setupRegisterEvents();
setupSocketNewMessage();
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
app.use('/admin_question_api/v1/',adminQuestionApiRouter);
app.use('/introducer_api/v1',introducerRouter);
app.use('/termofuse_api/v1',termofuseRouter);
/* TODO MSUT BE REMOVED! */
app.use('/admin_introducer_api/v1',adminIntroducerRouter);
app.use('/admin_termofuse_api/v1',adminTermOfUseRouter);
app.use('/admin_usermessage_api/v1',adminUserMessageRouter);
/* TODO MSUT BE REMOVED! */
app.use('/about_us/v1',aboutUsRouter);
/*----------------- -----------------------*/
app.listen(port, () => console.log('Listening on port ' + port));
/*----------------------------------------------*/


