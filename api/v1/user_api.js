var passport = require('passport');
var mongoose = require('mongoose');
var express = require('express');
const bodyParser = require('body-parser');
/*-------------------------------------------------*/
var api = express.Router();
api.use(bodyParser.json());
/*----------------VARIABLES------------------*/
var userValidationClass = require('../../src/util/validation/user-validation');
/*------------------FUNCTIONS----------------------*/

//Check if the user is authenticated
function isUserAuthenticated(req, res, next) {


    if (req.isAuthenticated()) {

        next();
    }
    else {

        res.redirect(303, '/user_api/v1/notlogedIn');
    }
}

//Save the new user
api.post('/user', (req, res) => {

    const bcrypt = require('bcrypt-nodejs');

    let response = new this.responseClass();
    response.isSuccessful = false;
    response.operationTimestamp = this.dateUtilModule.getCurrentDateTime();
   
    let userValidation = new userValidationClass();

    //unifrom data before the operation is done
    let receivedData = this.uniformData.uniformUserDetail(req.body);

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
        newUser.studentNumber = this.dateUtilModule.getCompactCurrentDate();

        let SkillScore = mongoose.model('SkillScore', SkillScoreSchema);
        newUser.skillScore.push(new SkillScore());


        let query = User.findOne({ 'userName': receivedData.userName }, 'userName');

        query.exec(function (queryError, user) {

            if (!queryError) {

                //Check wether the chosen username has already been taken by another user
                if (user) {

                    response.serverValidations.push(this.errorResource.ErrBu0009());
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

                                    let message = this.dbExceptionHandler.tryGetErrorMessage(countErr);

                                    if (message != null)
                                        response.serverValidations.push(message);
                                    else
                                        response.serverValidations.push(this.errorResource.Err0000());

                                    res.json({ response: response });
                                    return;

                                }
                                else {

                                    //Add the second part of the student number                                    
                                    newUser.studentNumber += count;

                                    //Save the new user
                                    newUser.save(function (err, user) {

                                        if (err) {                                           

                                            let message = this.dbExceptionHandler.tryGetErrorMessage(err);

                                            if (message != null)
                                                response.serverValidations.push(message);
                                            else
                                                response.serverValidations.push(this.errorResource.Err0000());

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

                            response.serverValidations.push(this.errorResource.Err0000());
                            res.json({ response: response });
                            return;
                        }
                    })
                }
            }
            else {                

                let message = this.dbExceptionHandler.tryGetErrorMessage(queryError);

                if (message != null)
                    response.serverValidations.push(message);
                else
                    response.serverValidations.push(this.errorResource.Err0000());

                res.json({ response: response });
                return;
            }
        });
    }
});

//Update the user information
api.put('/user', isUserAuthenticated, (req, res) => {
    
    let response = new this.responseClass();
    response.isSuccessful = false;
    response.operationTimestamp = this.dateUtilModule.getCurrentDateTime();
   
    let userValidation = new userValidationClass();

    let receivedData = this.uniformData.uniformUserDetail(req.body);
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

                            let message = this.dbExceptionHandler.tryGetErrorMessage(saveErr);

                            if (message != null)
                                response.serverValidations.push(message);
                            else
                                response.serverValidations.push(this.errorResource.Err0000());

                            res.json({ response: response });
                            return;
                        }
                    });
                }
                else {

                    response.serverValidations.push(this.errorResource.ErrBu0010());
                    res.json({ response: response });
                    return;
                }
            }
            else {              

                let message = this.dbExceptionHandler.tryGetErrorMessage(findErr);

                if (message != null)
                    response.serverValidations.push(message);
                else
                    response.serverValidations.push(this.errorResource.Err0000());

                res.json({ response: response });
                return;
            }
        })
    }
});

// Get the user information
api.get('/user', isUserAuthenticated, (req, res) => {   

    let response = new this.responseClass();
    response.isSuccessful = false;
    response.operationTimestamp = this.dateUtilModule.getCurrentDateTime();

    let columns = 'userName name lastName studentNumber';

    let User = require('../../model/user/user');

    let findQuery = User.findOne({ '_id': req.user._id }, columns);

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

            let message = this.dbExceptionHandler.tryGetErrorMessage(err);

            if (message != null)
                response.serverValidations.push(message);
            else
                response.serverValidations.push(this.errorResource.Err0000());

            res.json({ response: response });
            return;
        }

    });
});

// Get the user detailed information
api.get('/userDetail', isUserAuthenticated, (req, res) => {
 
    let response = new this.responseClass();
    response.isSuccessful = false;
    response.operationTimestamp = this.dateUtilModule.getCurrentDateTime();


    let columns = 'userName name lastName studentNumber registerationDate email gender ' +
        'cellphone province birthDate skillScore';

    let User = require('../../model/user/user');

    let findQuery = User.findOne({ '_id': req.user._id }, columns);

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

            let message = this.dbExceptionHandler.tryGetErrorMessage(err);

            if (message != null)
                response.serverValidations.push(message);
            else
                response.serverValidations.push(this.errorResource.Err0000());

            res.json({ response: response });
            return;
        }

    });
});

//Update the email
api.put('/user/email', isUserAuthenticated, (req, res) => {
   
    let response = new this.responseClass();
    response.isSuccessful = false;
    response.operationTimestamp = this.dateUtilModule.getCurrentDateTime();
  
    let userValidation = new userValidationClass();

    let errorMessages = userValidation.validateUpdateEmail(req.body.newEmail);

    if (errorMessages != null && errorMessages.length !== 0) {

        response.serverValidations = errorMessages;
        res.json({ response: response });
        return;
    }
    else {

        let userId = req.user._id;
        let newEmail = req.body.newEmail;

        let User = require('../../model/user/user');
        let countQuery = User.countDocuments({ email: newEmail, _id: { $ne: userId } });

        countQuery.exec(function (countErr, count) {

            if (!countErr) {

                // The email has not been taken already!
                if (count === 0) {

                    let findQuery = User.findOne({ _id: userId }, 'email');

                    findQuery.exec(function (findErr, user) {

                        if (!findErr) {

                            if (user) {

                                //Replace the new email with the old one
                                user.email = newEmail;
                                user.save(function (saveErr, savedUser) {

                                    if (!saveErr) {

                                        response.isSuccessful = true;
                                        res.json({ response: response });
                                        return;
                                    }
                                    else {                                       

                                        let message = this.dbExceptionHandler.tryGetErrorMessage(saveErr);

                                        if (message != null)
                                            response.serverValidations.push(message);
                                        else
                                            response.serverValidations.push(this.errorResource.Err0000());

                                        res.json({ response: response });
                                        return;
                                    }
                                })
                            }
                            else {

                            }
                        }
                        else {                         

                            let message = this.dbExceptionHandler.tryGetErrorMessage(findErr);

                            if (message != null)
                                response.serverValidations.push(message);
                            else
                                response.serverValidations.push(this.errorResource.Err0000());

                            res.json({ response: response });
                            return;
                        }

                    });

                }
                else {

                    response.serverValidations.push(this.errorResource.ErrBu0013());
                    res.json({response:response});
                    return;
                }

            }
            else {         

                let message = this.dbExceptionHandler.tryGetErrorMessage(countErr);

                if (message != null)
                    response.serverValidations.push(message);
                else
                    response.serverValidations.push(this.errorResource.Err0000());

                res.json({ response: response });
                return;
            }
        });
    }

});


//Change the password
api.put('/user/password', isUserAuthenticated, (req, res) => {
   
    let response = new this.responseClass();
    response.isSuccessful = false;
    response.operationTimestamp = this.dateUtilModule.getCurrentDateTime();
   
    let userValidation = new userValidationClass();

    let errorMessages = userValidation.validateChangePassword(req.body.oldPassword
        , req.body.newPassword, req.body.repeatedNewPassword);

    if (errorMessages != null && errorMessages.length != 0) {

        response.serverValidations = errorMessages;
        res.json({ response: response });
        return;
    }
    else {

        let User = require('../../model/user/user');
        let findQury = User.findOne({ _id: req.user._id }, 'password');

        findQury.exec(function (findErr, user) {

            if (!findErr) {

                if (user && user.password) {

                    user.checkPassword(req.body.oldPassword, function (checkPassErr, isMatch) {

                        if (!checkPassErr) {

                            if (isMatch) {

                                const bcrypt = require('bcrypt-nodejs');
                                bcrypt.hash(req.body.newPassword, bcrypt.genSaltSync(5), null, function (bcryptError, hash) {

                                    if (!bcryptError) {

                                        //Replase old password with the new,encrypted one!
                                        user.password = hash;

                                        //Save the new password
                                        user.save(function (saveErr, savedUser) {

                                            if (!saveErr) {

                                                response.isSuccessful = true;
                                                res.json({ response: response });
                                                return;
                                            }
                                            else {                                            

                                                let message = this.dbExceptionHandler.tryGetErrorMessage(saveErr);

                                                if (message != null)
                                                    response.serverValidations.push(message);
                                                else
                                                    response.serverValidations.push(this.errorResource.Err0000());

                                                res.json({ response: response });
                                                return;

                                            }
                                        });
                                    }
                                    else {

                                        response.serverValidations.push(this.errorResource.Err0000());
                                        res.json({ response: response });
                                        return;
                                    }
                                });
                            }
                            else {

                                response.serverValidations.push(this.errorResource.ErrBu0021());
                                res.json({ response: response });
                                return;
                            }
                        }
                        else {

                            response.serverValidations.push(this.errorResource.Err0000());
                            res.json({ response: response });
                            return;
                        }

                    });
                }
                else {

                    response.serverValidations.push(this.errorResource.ErrBu0010());
                    res.json({ response: response });
                    return;
                }
            }
            else {     

                let message = this.dbExceptionHandler.tryGetErrorMessage(findErr);

                if (message != null)
                    response.serverValidations.push(message);
                else
                    response.serverValidations.push(this.errorResource.Err0000());

                res.json({ response: response });
                return;
            }
        });
    }
});

/*------------------------------LOGIN----------------------------------*/
api.post('/user/login', passport.authenticate('login', {

    successRedirect: 'successfulLogin',
    failureRedirect: 'failedLogin',
}));

api.get('/user/successfulLogin', (req, res) => {
   
    let response = new global.responseClass();
    response.isSuccessful = true;
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();

    res.json({ response: response });
    return;
});

api.get('/user/failedLogin', (req, res) => {
   
    let response = new global.responseClass();
    response.isSuccessful = false;
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();
    response.serverValidations.push(global.errorResource.ErrBu0016());

    res.json({ response: response });
    return;
});

api.get('/user/logout', (req, res) => {

    req.logout();
    res.redirect('logedout');
});

api.get('/user/logedout', (req, res) => {
  
    let response = new this.responseClass();
    response.isSuccessful = true;
    response.operationTimestamp = this.dateUtilModule.getCurrentDateTime();

    res.json({ response: response });
    return res;
});

api.get('/notlogedIn', (req, res) => {
  
    let response = new this.responseClass();
    response.isSuccessful = false;
    response.operationTimestamp = this.dateUtilModule.getCurrentDateTime();
    response.serverValidations.push(this.errorResource.ErrBu0017());

    res.json({ response: response });
    return res;
});

module.exports = api;