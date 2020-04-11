var userValidationClass = require('../../src/util/validation/user-validation');
let User = require('../../model/user/user');
var mongoose = require('mongoose');
/*-----------------------------------------*/
const salt = 10;
const hiddenData = '***';
/*-----------------------------------------*/

function registerUser(userDetail, done) {

    const bcrypt = require('bcrypt-nodejs');
    let response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();

    let userValidation = new userValidationClass();


    //Unifrom data before the the data is saved in database
    let receivedData = global.uniformData.uniformUserDetail(userDetail);

    let errorMessages = userValidation.validateSignUpData(receivedData);

    if (errorMessages != null && errorMessages.length != 0) {

        response.serverValidations = errorMessages;
        done(response);
    }
    else {

        let SkillScoreSchema = require('../../model/user/skill-score');

        let newUser = new User({
            userName: receivedData.userName,
            name: receivedData.name,
            lastName: receivedData.lastName,
            registerationDate: Date.now(),
            province: receivedData.province
        });

        //Set the first part of the student number
        newUser.studentNumber = global.dateUtilModule.getCompactCurrentDate();

        let SkillScore = mongoose.model('SkillScore', SkillScoreSchema);
        newUser.skillScore.push(new SkillScore());

        let query = User.findOne({ 'userName': receivedData.userName }, 'userName');
        query.exec(function (queryError, user) {

            if (!queryError) {

                //Check wether the chosen username has already been taken by another user!
                if (user) {

                    response.isSuccessful = false;
                    response.serverValidations.push(global.errorResource.ErrBu0009());
                    done(response)
                }
                else {

                    //Encrypt the user's password
                    bcrypt.hash(receivedData.password, bcrypt.genSaltSync(salt), null, function (bcryptError, hash) {

                        if (!bcryptError) {

                            newUser.password = hash;
                            User.countDocuments({ 'studentNumber': { $regex: '^' + newUser.studentNumber } }, function (countErr, count) {

                                if (countErr) {

                                    response.isSuccessful = false;

                                    let message = global.dbExceptionHandler.tryGetErrorMessage(countErr);

                                    if (message != null)
                                        response.serverValidations.push(message);
                                    else
                                        response.serverValidations.push(global.errorResource.Err0000());

                                    done(response);

                                }
                                else {

                                    //Add the second part of the student number                                    
                                    newUser.studentNumber += count;

                                    //Save the new user
                                    newUser.save(function (saveErr, user) {

                                        if (saveErr) {

                                            response.isSuccessful = false;
                                            let message = global.dbExceptionHandler.tryGetErrorMessage(err);

                                            if (message != null)
                                                response.serverValidations.push(message);
                                            else
                                                response.serverValidations.push(global.errorResource.Err0000());

                                            done(response)
                                        }
                                        else {

                                            //TODO: After the user is saved,
                                            // A welocme message must be sent!
                                            response.isSuccessful = true;
                                            user._id = hiddenData;
                                            user.password = hiddenData;
                                            response.outputJson = user;

                                            done(response);

                                        }
                                    });
                                }
                            }).exec();
                        }
                        else {

                            response.isSuccessful = false;
                            response.serverValidations.push(global.errorResource.Err0000());
                            done(response);
                        }
                    });
                }
            }
            else {

                response.isSuccessful = false;
                let message = global.dbExceptionHandler.tryGetErrorMessage(queryError);

                if (message != null)
                    response.serverValidations.push(message);
                else
                    response.serverValidations.push(global.errorResource.Err0000());

                done(response);
            }
        });
    }
}
module.exports.registerUser = registerUser;

function updateUserInformation(userDetail,studentNumber, done) {

    let response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();

    let userValidation = new userValidationClass();

    let receivedData = global.uniformData.uniformUserDetail(userDetail);
    let errorMessages = userValidation.validateUpdateData(receivedData);


    if (errorMessages != null && errorMessages.length != 0) {

        response.isSuccessful = false;
        response.serverValidations = errorMessages;
        done(response)
    }
    else {

        // Firts, find the user using the student number
        User.findOne({ studentNumber: studentNumber }, function (findErr, user) {

            if (!findErr) {

                if (user) {

                    //Set sent data
                    user.name = receivedData.name;
                    user.lastName = receivedData.lastName;
                    user.gender = receivedData.gender;
                    user.cellphone = receivedData.cellphone;
                    user.province = receivedData.province;
                    user.birthDate = receivedData.birthDate;

                    //Save the instance and return it to the client
                    user.save(function (saveErr, savedUser) {

                        if (!saveErr) {

                            response.isSuccessful = true;
                            user._id = hiddenData;
                            user.password = hiddenData;
                            response.outputJson = savedUser;
                            done(response);
                        }
                        else {

                            response.isSuccessful = false;
                            let message = global.dbExceptionHandler.tryGetErrorMessage(saveErr);

                            if (message != null)
                                response.serverValidations.push(message);
                            else
                                response.serverValidations.push(global.errorResource.Err0000());

                            done(response);
                        }
                    });
                }
                else {

                    response.isSuccessful = false;
                    response.serverValidations.push(global.errorResource.ErrBu0010());
                    done(response);
                }
            }
            else {

                response.isSuccessful = false;
                let message = global.dbExceptionHandler.tryGetErrorMessage(findErr);

                if (message != null)
                    response.serverValidations.push(message);
                else
                    response.serverValidations.push(global.errorResource.Err0000());

                done(response);
            }
        })
    }
}
module.exports.updateUserInformation = updateUserInformation;

function getUserInformation(userId, done) {

    let response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();

    let columns = 'userName name lastName studentNumber';
    let findQuery = User.findOne({ '_id': userId }, columns);

    findQuery.exec(function (err, user) {

        if (!err) {

            response.isSuccessful = true;

            if (user) {

                response.outputJson = user;
            }
            done(response);
        }
        else {

            response.isSuccessful = false;
            let message = global.dbExceptionHandler.tryGetErrorMessage(err);

            if (message != null)
                response.serverValidations.push(message);
            else
                response.serverValidations.push(global.errorResource.Err0000());

            done(response);
        }
    });
}
module.exports.getUserInformation = getUserInformation;

function getDetailedUserInformation(userId, done) {

    let response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();

    let columns = 'userName name lastName studentNumber registerationDate email gender ' +
        'cellphone province birthDate skillScore';

    let findQuery = User.findOne({ '_id': userId }, columns);

    findQuery.exec(function (err, user) {

        if (!err) {
            //Query has been excuted successfully
            response.isSuccessful = true;

            if (user) {

                response.outputJson = user;
            }
            done(response);
        }
        else {

            response.isSuccessful = false;
            let message = global.dbExceptionHandler.tryGetErrorMessage(err);

            if (message != null)
                response.serverValidations.push(message);
            else
                response.serverValidations.push(global.errorResource.Err0000());

            done(reponse);
        }
    });
}
module.exports.getDetailedUserInformation = getDetailedUserInformation;

function updateUserEmail(newEmail, userId, done) {

    let response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();

    let userValidation = new userValidationClass();
    let errorMessages = userValidation.validateUpdateEmail(newEmail);

    if (errorMessages != null && errorMessages.length !== 0) {

        response.serverValidations = errorMessages;
        done(response);
    }
    else {

        let countQuery = User.countDocuments({ email: newEmail, _id: { $ne: userId } });
        countQuery.exec(function (countErr, count) {

            if (!countErr) {

                // The email has not been taken!
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
                                        response.outputJson = savedUser;
                                        done(response);
                                    }
                                    else {

                                        response.isSuccessful = false;
                                        let message = global.dbExceptionHandler.tryGetErrorMessage(saveErr);

                                        if (message != null)
                                            response.serverValidations.push(message);
                                        else
                                            response.serverValidations.push(global.errorResource.Err0000());
                                        done(response);
                                    }
                                });
                            }
                            else {
                                
                                response.isSuccessful = false;
                                response.serverValidations.push(global.errorResource. Err0004());
                            }
                        }
                        else {

                            response.isSuccessful = false;
                            let message = global.dbExceptionHandler.tryGetErrorMessage(findErr);

                            if (message != null)
                                response.serverValidations.push(message);
                            else
                                response.serverValidations.push(global.errorResource.Err0000());
                            done(response);
                        }
                    });
                }
                else {

                    response.isSuccessful = false;
                    response.serverValidations.push(global.errorResource.ErrBu0013());
                    done(response);
                }
            }
            else {

                response.isSuccessful = false;
                let message = global.dbExceptionHandler.tryGetErrorMessage(countErr);

                if (message != null)
                    response.serverValidations.push(message);
                else
                    response.serverValidations.push(global.errorResource.Err0000());
                done(response);
            }
        });
    }
}
module.exports.updateUserEmail = updateUserEmail;

function changeUserPassword(oldPassword,newPassword,repeatedNewPassword,userId,done){
    
    let response = new global.responseClass();    
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();

    let userValidation = new userValidationClass();    
    let errorMessages = userValidation.validateChangePassword(oldPassword,newPassword,repeatedNewPassword);

    if (errorMessages != null && errorMessages.length != 0) {

        response.isSuccessful = false;
        response.serverValidations = errorMessages;
        done(response);
    }
    else{

        let findQury = User.findOne({ _id:userId }, 'password');
        findQury.exec(function (findErr, user) {

            if (!findErr) {

                if (user && user.password) {

                    user.checkPassword(oldPassword, function (checkPassErr, isMatch) {

                        if (!checkPassErr) {

                            if (isMatch) {

                                const bcrypt = require('bcrypt-nodejs');
                                bcrypt.hash(newPassword, bcrypt.genSaltSync(salt), null, function (bcryptError, hash) {

                                    if (!bcryptError) {

                                        //Replase old password with the new,encrypted one!
                                        user.password = hash;
                                        //Save the new password
                                        user.save(function (saveErr, savedUser) {

                                            if (!saveErr) {

                                                response.isSuccessful = true;
                                                savedUser.password = hiddenData;
                                                response.outputJson = savedUser
                                                done(response);
                                            }
                                            else {                                            

                                                response.isSuccessful = false;
                                                let message = global.dbExceptionHandler.tryGetErrorMessage(saveErr);

                                                if (message != null)
                                                    response.serverValidations.push(message);
                                                else
                                                    response.serverValidations.push(global.errorResource.Err0000());
                                                done(reponse);                                              

                                            }
                                        });
                                    }
                                    else {

                                        response.isSuccessful = false;
                                        response.serverValidations.push(global.errorResource.Err0000());
                                        done(response);
                                    }
                                });
                            }
                            else {

                                response.isSuccessful = false;
                                response.serverValidations.push(global.errorResource.ErrBu0021());
                                done(response);
                            }
                        }
                        else {

                            response.isSuccessful = false;
                            response.serverValidations.push(global.errorResource.Err0000());
                            done(response);                            
                        }
                    });
                }
                else {

                    response.isSuccessful = false;
                    response.serverValidations.push(global.errorResource.ErrBu0010());
                    done(response);
                }
            }
            else {     

                response.isSuccessful = false;
                let message = global.dbExceptionHandler.tryGetErrorMessage(findErr);

                if (message != null)
                    response.serverValidations.push(message);
                else
                    response.serverValidations.push(global.errorResource.Err0000());
                done(response);
            }
        });
    }
}
module.exports.changeUserPassword = changeUserPassword;