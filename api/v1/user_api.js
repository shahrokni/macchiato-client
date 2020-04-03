var passport = require('passport');
/*--------------------------------------------------*/
var mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
/*----------------------------------------------------*/
var express = require('express');
const bodyParser = require('body-parser');
/*-------------------------------------------------*/
var api = express.Router();
api.use(bodyParser.json());
/*--------------------------------------------------*/

var dateUtilModule = require('../../src/util/date-util/date-util');
var errorResource = require('../../src/resource/text/error-message');

var uniformData = require('../../src/util/uniform-data/uniform-data');
/*------------------Function----------------------*/
function isUserAuthenticated(req,res,next){

   
    if(req.isAuthenticated()){

        next();
    }
    else{       
       
        res.redirect(303,'notlogedIn');
    }
}
/*-------------------------------------------------*/
api.post('/user', (req, res) => {

    const bcrypt = require('bcrypt-nodejs');

    let responseClass = require('../../src/communication/entity/response');
    let response = new responseClass();

    response.isSuccessful = false;
    response.operationTimestamp = dateUtilModule.getCurrentDateTime();

    let userValidationClass = require('../../src/util/validation/user-validation');
    let userValidation = new userValidationClass();

    //unifrom data before the operation is done
    let receivedData = uniformData.uniformUserDetail(req.body);

    let errorMessages = userValidation.validateSignUpData(receivedData);

    if (errorMessages != null && errorMessages.length != 0) {

        response.serverValidations = errorMessages;
        res.json({ response: response });
        return;

    }
    else {
        let User = require('../../model/user/user');
        let SkillScoreSchema = require('../../model/user/skill-score');

        let newUser = new User({
            userName: receivedData.userName,
            name: receivedData.name,
            lastName: receivedData.lastName,
            registerationDate: Date.now(),
            province: receivedData.province
        });

        //Set the first part of student number
        newUser.studentNumber = dateUtilModule.getCompactCurrentDate();

        let SkillScore = mongoose.model('SkillScore', SkillScoreSchema);
        newUser.skillScore.push(new SkillScore());


        let query = User.findOne({ 'userName': receivedData.userName }, 'userName');

        query.exec(function (queryError, user) {

            if (!queryError) {

                //Check wether the chosen username has already been taken by another user
                if (user) {

                    response.serverValidations.push(errorResource.ErrBu0009());
                    res.json({ response: response });
                    return;
                }
                else {

                    //Encrypt the user's password
                    bcrypt.hash(receivedData.password, bcrypt.genSaltSync(5), null, function (bcryptError, hash) {

                        if (!bcryptError) {

                            newUser.password = hash;

                            User.countDocuments({ 'studentNumber': { $regex: '^' + newUser.studentNumber } }, function (countErr, count) {

                                if (countErr) {

                                    let exceptionHandler =
                                        require('../../src/util/mongo-handler/mongo-exception-handler');

                                    let message = exceptionHandler.tryGetErrorMessage(countErr);

                                    if (message != null)
                                        response.serverValidations.push(message);
                                    else
                                        response.serverValidations.push(errorResource.Err0000());

                                    res.json({ response: response });
                                    return;

                                }
                                else {

                                    //Add the second part of the student number                                    
                                    newUser.studentNumber += count;

                                    //Save the new user
                                    newUser.save(function (err, user) {

                                        if (err) {

                                            let exceptionHandler =
                                                require('../../src/util/mongo-handler/mongo-exception-handler');

                                            let message = exceptionHandler.tryGetErrorMessage(err);

                                            if (message != null)
                                                response.serverValidations.push(message);
                                            else
                                                response.serverValidations.push(errorResource.Err0000());

                                            res.json({ response: response });
                                            return;
                                        }
                                        else {

                                            response.isSuccessful = true;
                                            user._id = '';
                                            user.password = '***';
                                            response.outputJson = user;
                                            res.json({ response: response });
                                            return;
                                        }
                                    });

                                }
                            }).exec();
                        }
                        else {

                            response.serverValidations.push(errorResource.Err0000());
                            res.json({ response: response });
                            return;
                        }
                    })
                }
            }
            else {

                let exceptionHandler =
                    require('../../src/util/mongo-handler/mongo-exception-handler');

                let message = exceptionHandler.tryGetErrorMessage(queryError);

                if (message != null)
                    response.serverValidations.push(message);
                else
                    response.serverValidations.push(errorResource.Err0000());

                res.json({ response: response });
                return;
            }
        });
    }
});

api.put('/user',isUserAuthenticated, (req, res) => {


    let responseClass = require('../../src/communication/entity/response');
    let response = new responseClass();
    response.isSuccessful = false;
    response.operationTimestamp = dateUtilModule.getCurrentDateTime();

    let userValidationClass = require('../../src/util/validation/user-validation');
    let userValidation = new userValidationClass();

    let receivedData = uniformData.uniformUserDetail(req.body);
    let errorMessages = userValidation.validateUpdateData(receivedData);

    if (errorMessages != null && errorMessages.length != 0) {

        response.serverValidations = errorMessages;
        res.json({ response: response });
        return;
    }
    else {

        let User = require('../../model/user/user');

        // Firts, find the user using the student number
        User.findOne({ studentNumber: req.user.studentNumber }, function (findErr, user) {

            if (!findErr) {

                if (user) {

                    //Set sent data
                    user.name = receivedData.name;
                    user.lastName = receivedData.lastName;
                    user.email = receivedData.email;
                    user.gender = receivedData.gender;
                    user.cellphone = receivedData.cellphone;
                    user.province = receivedData.province;
                    user.birthDate = receivedData.birthDate;

                    //Save the instance and return it to the client
                    user.save(function (saveErr, savedUser) {

                        if (!saveErr) {

                            response.isSuccessful = true;
                            user._id = '';
                            user.password = '***';
                            response.outputJson = savedUser;
                            res.json({ response: response });
                            return;
                        }
                        else {

                            let exceptionHandler =
                                require('../../src/util/mongo-handler/mongo-exception-handler');

                            let message = exceptionHandler.tryGetErrorMessage(saveErr);

                            if (message != null)
                                response.serverValidations.push(message);
                            else
                                response.serverValidations.push(errorResource.Err0000());

                            res.json({ response: response });
                            return;
                        }
                    });
                }
                else {

                    response.serverValidations.push(errorResource.ErrBu0010());
                    res.json({ response: response });
                    return;
                }
            }
            else {

                let exceptionHandler =
                    require('../../src/util/mongo-handler/mongo-exception-handler');

                let message = exceptionHandler.tryGetErrorMessage(findErr);

                if (message != null)
                    response.serverValidations.push(message);
                else
                    response.serverValidations.push(errorResource.Err0000());

                res.json({ response: response });
                return;
            }
        })
    }
});

api.get('/user',isUserAuthenticated, (req, res) => {


    let responseClass = require('../../src/communication/entity/response');
    let response = new responseClass();

    response.isSuccessful = false;
    response.operationTimestamp = dateUtilModule.getCurrentDateTime();
   
    let columns = 'userName name lastName studentNumber';

    let User = require('../../model/user/user');   

    let findQuery = User.findOne({'_id':req.user._id}, columns);

    findQuery.exec(function (err, user) {

        if (!err) {

            //Query has been excuted successfully
            response.isSuccessful = true;

            if (user) {

                response.outputJson = user;
                res.json({ response: response });
                return;
            }
            else {

                res.json({ response: response });
                return;
            }
        }
        else {

            let exceptionHandler =
                require('../../src/util/mongo-handler/mongo-exception-handler');

            let message = exceptionHandler.tryGetErrorMessage(err);

            if (message != null)
                response.serverValidations.push(message);
            else
                response.serverValidations.push(errorResource.Err0000());

            res.json({ response: response });
            return;
        }

    });
});

api.get('/userDetail',isUserAuthenticated, (req, res) => {


    let responseClass = require('../../src/communication/entity/response');
    let response = new responseClass();

    response.isSuccessful = false;
    response.operationTimestamp = dateUtilModule.getCurrentDateTime();

   
    let columns = 'userName name lastName studentNumber registerationDate email gender ' +
        'cellphone province birthDate skillScore';

    let User = require('../../model/user/user');    

    let findQuery = User.findOne({'_id':req.user._id}, columns);

    findQuery.exec(function (err, user) {

        if (!err) {

            //Query has been excuted successfully
            response.isSuccessful = true;

            if (user) {

                response.outputJson = user;
                res.json({ response: response });
                return;
            }
            else {

                res.json({ response: response });
                return;
            }
        }
        else {


            let exceptionHandler =
                require('../../src/util/mongo-handler/mongo-exception-handler');

            let message = exceptionHandler.tryGetErrorMessage(err);

            if (message != null)
                response.serverValidations.push(message);
            else
                response.serverValidations.push(errorResource.Err0000());

            res.json({ response: response });
            return;
        }

    });
});

api.post('/user/login', passport.authenticate('login', {

    successRedirect: 'successfulLogin',
    failureRedirect: 'failedLogin',
}));

api.get('/user/successfulLogin', (req, res) => {
    
    let responseClass = require('../../src/communication/entity/response');
    let response = new responseClass();

    response.isSuccessful = true;
    response.operationTimestamp = dateUtilModule.getCurrentDateTime();

    res.json({ response: response });
    return;
});

api.get('/user/failedLogin', (req, res) => {
    
    let responseClass = require('../../src/communication/entity/response');
    let response = new responseClass();

    response.isSuccessful = false;
    response.operationTimestamp = dateUtilModule.getCurrentDateTime();
    response.serverValidations.push(errorResource.ErrBu0016());

    res.json({ response: response });
    return;
});

api.get('/user/logout', (req, res) => {

    req.logout();
    res.redirect('logedout');
});

api.get('/user/logedout',(req,res)=>{

    let responseClass = require('../../src/communication/entity/response');
    let response = new responseClass();
    response.isSuccessful = true;
    response.operationTimestamp = dateUtilModule.getCurrentDateTime();

    res.json({response:response});
    return res;
});

api.get('/notlogedIn',(req,res)=>{

    let responseClass = require('../../src/communication/entity/response');
    let response = new responseClass();
    response.isSuccessful = false;
    response.operationTimestamp = dateUtilModule.getCurrentDateTime();
    response.serverValidations.push(errorResource.ErrBu0017());

    res.json({response:response});
    return res;
});

module.exports = api;