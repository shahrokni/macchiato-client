var userValidationClass = require('../../src/util/validation/user-validation');
var User = require('../../model/user/user');
var UserDetail = require('../../model/user/user-detail');
var mongoose = require('mongoose');
/*-----------------------------------------*/
const salt = 10;
const hiddenData = '***';
/*-----------------------------------------*/

async function registerUser(userDetail) {

    const bcrypt = require('bcrypt-nodejs');
    let response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();
    let userValidation = new userValidationClass();
    //Unifrom data before the the data is saved in database
    let receivedData = global.uniformData.uniformUserDetail(userDetail);
    let errorMessages = userValidation.validateSignUpData(receivedData);

    if (errorMessages != null && errorMessages.length != 0) {

        response.isSuccessful = false;
        response.serverValidations = errorMessages;
        return Promise.resolve(response);
    }
 
    let newUser = new User({
        userName: receivedData.userName,       
    });

    let newUserDetail = new UserDetail.UserDetail({
        name: receivedData.name,
        lastName: receivedData.lastName,
        registerationDate: Date.now(),
        province: receivedData.province
    });

    let SkillScoreSchema = require('../../model/user/skill-score');
    let SkillScore = mongoose.model('SkillScore', SkillScoreSchema);

    //Set the first part of the student number
    newUserDetail.studentNumber = global.dateUtilModule.getCompactCurrentDate();
    //Add a SkillScore subdocument    
    newUserDetail.skillScore.push(new SkillScore());

    let query = User.findOne({ 'userName': receivedData.userName }, 'userName');
    await query.exec().then((foundUser) => {

        //Check wether the chosen username has already been taken by another user!
        if (foundUser) {

            response.isSuccessful = false;
            response.serverValidations.push(global.errorResource.ErrBu0009());
            return Promise.resolve(response);
        }
    })
        .catch((exception) => {

            response.isSuccessful = false;
            response.serverValidations.push(global.errorResource.Err0000());
            return Promise(response);
        });

    bcrypt.hash(receivedData.password, bcrypt.genSaltSync(salt), null, function (bcryptError, hash) {

        if (!bcryptError) {

            newUser.password = hash;
            let countQuery = User.countDocuments({ 'studentNumber': { $regex: '^' + newUser.studentNumber } });
            let countedItem = 0 ;
            await countQuery.exec().then((count) => {

                countedItem = count;
            })
                .catch((exception) => {

                    response.isSuccessful = false;                
                    response.serverValidations.push(global.errorResource.Err0000());
                    return Promise.resolve(response);
                });

            //Add the second part of the student number                                    
            newUser.studentNumber += countedItem;

            //Create a session and start a transaction. ALL-OR-NONE OPERATION!
            const session = await mongoose.startSession();
            session.startTransaction();
            try{

                let newUserId = '';
                let newUserDetailId = '';

                const opt = {session};
                await newUser.save(opt)
                .then((savedUser)=>{

                    newUserId = savedUser._id;
                })
                    .catch((exception)=>{
                       
                        let message = global.dbExceptionHandler.tryGetErrorMessage(exception);
                        if (message != null)
                            throw message;
                        else
                            throw global.errorResource.Err0000();                        
                    });
                
                    await newUserDetail.save(opt)
                    .then((savedUserDetail)=>{

                        newUserDetailId = savedUserDetail._id;
                    })
                    .catch((exception)=>{
                        
                        let message = global.dbExceptionHandler.tryGetErrorMessage(exception);
                        if (message != null)
                            throw message;
                        else
                            throw global.errorResource.Err0000();                        
                    });
                    
                     //Initiate a financial account
                    let accountControler =
                    require('../../administrator_controller/v1/administrator_financial_account_controller');
                    await accountControler.initiateUserFinancialAccount(newUserDetailId,opt);

                    //Send a message
                    let messageController =
                    require('../../administrator_controller/v1/administrator_user_message_controller');
                    let message = {
                        'receiverId': newUserDetailId,
                        'senderId': 'Administrator',
                        'sentDate': Date.now(),
                        'title': global.systemMessages.welcomeTitle,
                        'text': global.systemMessages.welcomeMessage
                    };

                    await messageController.sendMessage(message,opt);
                    
                    let findQuery = User.findById(newUserId,null,opt);
                    await findQuery.exec().then((foundNewUser)=>{

                        foundNewUser.userDetail = newUserDetailId;
                        //Connect user to userDetail
                        await foundNewUser.save(opt)                        
                        .catch((exception)=>{

                            throw global.errorResource.Err0000();
                        });
                    })
                    .catch((exception)=>{
                        
                        throw global.errorResource.Err0000();
                    });

                     //commit the transaction and end the session
                    await session.commitTransaction();
                    session.endSession();
                    response.isSuccessful = true;
                    receivedData.password = hiddenData;
                    response.outputJson = receivedData;    
                    return Promise.resolve(response);
                
            }
            catch(exception){

                await session.abortTransaction();
                session.endSession();

                response.isSuccessful = false;
                response.serverValidations.push(exception);
                return Promise.resolve(response);
            }
        }
        else{
          
            response.isSuccessful = false;
            response.serverValidations.push(global.errorResource.Err0000());
            return Promise.resolve(response);
        }
    });
}
module.exports.registerUser = registerUser;
//---------------------------------------------------------------------------------------

function updateUserInformation(userDetail, studentNumber, done) {

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
                            savedUser.password = hiddenData;
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

        let countQuery = User.countDocuments({ $and: [{ email: newEmail }, { email: { $ne: '' } }], _id: { $ne: userId } });
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
                                response.serverValidations.push(global.errorResource.Err0004());
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

function changeUserPassword(oldPassword, newPassword, repeatedNewPassword, userId, done) {

    let response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();

    let userValidation = new userValidationClass();
    let errorMessages = userValidation.validateChangePassword(oldPassword, newPassword, repeatedNewPassword);

    if (errorMessages != null && errorMessages.length != 0) {

        response.isSuccessful = false;
        response.serverValidations = errorMessages;
        done(response);
    }
    else {

        let findQury = User.findOne({ _id: userId }, 'password');
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