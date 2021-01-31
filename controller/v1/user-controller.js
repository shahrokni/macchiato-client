//NOTE1: I USED OLD CALL BACK APPROACH IN SOME SCENARIOS TO SHOW THAT I CAN HANDLE ALL STYLES OF CODING!
//NOTE2: PROMISE BASE (ASYNC/AWAIT) APPROACH HAS BEEN USED IN SOME SCENARIOS!
//NOTE1: I USED OLD CALL BACK APPROACH IN SOME SCENARIOS TO SHOW THAT I CAN HANDLE ALL STYLES OF CODING!
//NOTE2: PROMISE BASE (ASYNC/AWAIT) APPROACH HAS BEEN USED IN SOME SCENARIOS!
//NOTE1: I USED OLD CALL BACK APPROACH IN SOME SCENARIOS TO SHOW THAT I CAN HANDLE ALL STYLES OF CODING!

var userValidationClass = require('../../src/util/validation/user-validation');
var User = require('../../model/user/user');
var UserDetail = require('../../model/user/user-detail');
var mongoose = require('mongoose');
/*-----------------------------------------*/
const salt = 10;
const hiddenData = '***';
/*-----------------------------------------*/
//TODO
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
        province: receivedData.province,
        introducer: receivedData.introducerCode,
        gender: receivedData.gender
    });

    let SkillScoreSchema = require('../../model/user/skill-score');
    let SkillScore = mongoose.model('SkillScore', SkillScoreSchema);

    //Set the first part of the student number
    newUserDetail.studentNumber = global.dateUtilModule.getCompactCurrentDate();
    //Add a SkillScore subdocument    
    newUserDetail.skillScore.push(new SkillScore());

    let query = User.findOne({ 'userName': receivedData.userName }, 'userName');

    try {

        await query.exec().then((foundUser) => {

            //Check wether the chosen username has already been taken by another user!
            if (foundUser) {

                throw global.errorResource.ErrBu0009();
            }
        });
    }
    catch (exception) {

        response.isSuccessful = false;
        response.serverValidations.push(exception);
        return Promise.resolve(response);
    }

    let hash = bcrypt.hashSync(receivedData.password, bcrypt.genSaltSync(salt));

    newUser.password = hash;
    let countQuery = UserDetail.UserDetail.countDocuments({ 'studentNumber': { $regex: '^' + newUserDetail.studentNumber } });
    let countedItem;

    try {

        await countQuery.exec().then((count) => {

            countedItem = count;
        })
            .catch((exception) => {

                throw global.errorResource.Err0000();
            });
    }
    catch (exception) {

        response.isSuccessful = false;
        response.serverValidations.push(exception);
        return Promise.resolve(response);
    }

    //Add the second part of the student number    
    newUserDetail.studentNumber += countedItem;

    //Create a session and start a transaction. ALL-OR-NONE OPERATION!
    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        let newUserId = '';
        let newUserDetailId = '';

        const opt = { session };
        await newUser.save(opt)
            .then((savedUser) => {

                newUserId = savedUser._id;
            })
            .catch((exception) => {

                let message = global.dbExceptionHandler.tryGetErrorMessage(exception);
                if (message != null)
                    throw message;
                else
                    throw global.errorResource.Err0000();
            });

        await newUserDetail.save(opt)
            .then((savedUserDetail) => {

                newUserDetailId = savedUserDetail._id;
            })
            .catch((exception) => {
                let message = global.dbExceptionHandler.tryGetErrorMessage(exception);
                if (message != null)
                    throw message;
                else
                    throw global.errorResource.Err0000();
            });

        //Initiate a financial account
        let accountControler =
            require('../../administrator_controller/v1/administrator_financial_account_controller');

        await accountControler.initiateUserFinancialAccount(newUserDetailId, opt)
            .catch((exception) => {

                throw global.errorResource.Err0000();
            });

        //Send a welcome message!
        let messageController =
            require('../../administrator_controller/v1/administrator_user_message_controller');


        await messageController.sendInitialMessage(newUserDetailId, opt)
            .catch((exception) => {

                throw global.errorResource.Err0000();
            });

        let findQuery = User.findById(newUserId, null, opt);
        let foundNewUser;

        await findQuery.exec().then((newUser) => {

            foundNewUser = newUser;
        })
            .catch((exception) => {

                throw global.errorResource.Err0000();
            });

        foundNewUser.userDetail = newUserDetailId;
        //Connect user to userDetail
        await foundNewUser.save(opt)
            .catch((exception) => {

                throw global.errorResource.Err0000();
            });

        //Fetch and return the saved user    
        let userDetailObject;
        let fetchFinalResultQuery = UserDetail.UserDetail
            .findById(newUserDetailId, null, opt);

        await fetchFinalResultQuery.exec()
            .then((fetchedUser) => {

                userDetailObject = {
                    userName: receivedData.userName,
                    name: fetchedUser.name,
                    lastName: fetchedUser.lastName,
                    studentNumber: fetchedUser.studentNumber,
                    registerationDate: fetchedUser.registerationDate,
                    province: fetchedUser.province
                }
            })
            .catch((exception) => {

                throw global.errorResource.Err0000();
            });

        //commit the transaction and end the session
        await session.commitTransaction();
        session.endSession();
        response.isSuccessful = true;
        response.outputJson = userDetailObject;
        return Promise.resolve(response);

    }
    catch (exception) {

        await session.abortTransaction();
        session.endSession();

        response.isSuccessful = false;
        response.serverValidations.push(exception);
        return Promise.resolve(response);
    }
}
module.exports.registerUser = registerUser;
//---------------------------------------------------------------------------------------
//TODO
function updateUserInformation(userDetail, userId, done) {

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

        User.findById(userId, (findByIdErr, foundUser) => {

            if (!findByIdErr) {

                let userDetailId = foundUser.userDetail;

                UserDetail.UserDetail.findById(userDetailId, function (findErr, foundUserDetail) {

                    if (!findErr) {

                        if (foundUserDetail) {

                            //Set sent data
                            foundUserDetail.name = receivedData.name;
                            foundUserDetail.lastName = receivedData.lastName;
                            foundUserDetail.gender = receivedData.gender;
                            foundUserDetail.cellphone = receivedData.cellphone;
                            foundUserDetail.province = receivedData.province;
                            foundUserDetail.birthDate = receivedData.birthDate;

                            //Save the instance and return it to the client
                            foundUserDetail.save(function (saveErr, savedUserDetail) {

                                if (!saveErr) {

                                    response.isSuccessful = true;

                                    userDetailObj = {
                                        name: savedUserDetail.name,
                                        lastName: savedUserDetail.lastName,
                                        studentNumber: savedUserDetail.studentNumber,
                                        registerationDate: savedUserDetail.registerationDate,
                                        gender: savedUserDetail.gender,
                                        cellphone: savedUserDetail.cellphone,
                                        province: savedUserDetail.province,
                                        birthDate: savedUserDetail.birthDate,
                                    }
                                    response.outputJson = userDetailObj;
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
                });
            }
            else {

                response.isSuccessful = false;
                response.serverValidations.push(global.errorResource.ErrBu0010());
                done(response);
            }
        });

    }
}
module.exports.updateUserInformation = updateUserInformation;
//------------------------------------------------------------------
//TODO
function getDetailedUserInformation(userId, done) {

    let response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();

    let userFindQuery = User.findOne({ _id: userId })
        .populate('userDetail');

    userFindQuery.exec((userFindErr, fetchedUserDetail) => {

        if (!userFindErr) {

            response.isSuccessful = true;
            responseObj = {
                userName: fetchedUserDetail.userName,
                userDetail: {
                    name: fetchedUserDetail.userDetail.name,
                    lastName: fetchedUserDetail.userDetail.lastName,
                    studentNumber: fetchedUserDetail.userDetail.studentNumber,
                    registerationDate: fetchedUserDetail.userDetail.registerationDate,
                    email: fetchedUserDetail.userDetail.email,
                    gender: fetchedUserDetail.userDetail.gender,
                    cellphone: fetchedUserDetail.userDetail.cellphone,
                    province: fetchedUserDetail.userDetail.province,
                    birthDate: fetchedUserDetail.userDetail.birthDate,
                    skillScore: fetchedUserDetail.userDetail.skillScore,
                    id: fetchedUserDetail.userDetail._id
                }
            }
            response.outputJson = responseObj;
            done(response)
        }
        else {

            response.isSuccessful = false;
            let message = global.dbExceptionHandler.tryGetErrorMessage(userFindErr);

            if (message != null)
                response.serverValidations.push(message);
            else
                response.serverValidations.push(global.errorResource.Err0000());

            done(response);
        }

    });
}
module.exports.getDetailedUserInformation = getDetailedUserInformation;
//---------------------------------------------------------------------
function updateUserEmail(newEmail, userId) {

    const response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();

    return new Promise((resolve) => {

        const userValidation = new userValidationClass();
        const errorMessages = userValidation.validateUpdateEmail(newEmail);
        if (errorMessages != null && errorMessages.length !== 0) {
            response.isSuccessful = false;
            response.serverValidations = errorMessages;
            resolve(respone);
        }

        User.findById(userId, { userDetail: 1 }).then((userDetailId) => {
            UserDetail.UserDetail.findOneAndUpdate({ _id: userDetailId },
                { email: newEmail },
                { upsert: false, returnNewDocument: true }).then((userDetail) => {
                    response.isSuccessful = true;
                    userDetailObj = {
                        studenNumber: userDetail.studentNumber,
                        email: userDetail.email,
                    }
                    response.outputJson = userDetailObj;
                    resolve(response);
                }).catch((err) => {
                    response.isSuccessful = false;
                    let message = global.dbExceptionHandler.tryGetErrorMessage(userFindErr);
                    if (message != null)
                        response.serverValidations.push(message);
                    else
                        response.serverValidations.push(global.errorResource.Err0000());
                    resolve(response);
                })
        })
            .catch(() => {
                response.isSuccessful = false;
                response.serverValidations.push(global.errorResource.Err0000());
                resolve(response);
            });
    });
}
module.exports.updateUserEmail = updateUserEmail;
//---------------------------------------------------------------
function getEmail(userId) {

    const response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();

    return new Promise((resolve) => {
        let aggregate = User.aggregate([{ $match: { _id: mongoose.Types.ObjectId(userId) } },
        { $lookup: { from: 'userdetails', localField: 'userDetail', foreignField: '_id', as: 'detail' } },
        { $project: { first: { $arrayElemAt: ["$detail.email.0"] }, '_id': 0 } }]);
        aggregate.exec((err, result) => {
            if (err) {
                response.isSuccessful = false;
                response.serverValidations.push(global.errorResource.Err0000());
                resolve(response);
            }
            else {
                response.isSuccessful = true;
                if (result && result.length > 0)
                    response.outputJson = result[0].first;
                resolve(response);
            }
        });
    });
}
module.exports.getEmail = getEmail;
//---------------------------------------------------------
function getCellphone(userId) {
    const response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCompactCurrentDate();

    return new Promise((resolve) => {
        let aggregate = User.aggregate([{ $match: { _id: mongoose.Types.ObjectId(userId) } },
        { $lookup: { from: 'userdetails', localField: 'userDetail', foreignField: '_id', as: 'detail' } },
        { $project: { first: { $arrayElemAt: ["$detail.cellphone.0"] }, '_id': 0 } }]);
        aggregate.exec((err, result) => {
            if (err) {
                response.isSuccessful = false;
                response.serverValidations.push(global.errorResource.Err0000());
                resolve(response);
            }
            else {
                response.isSuccessful = true;
                if (result && result.length > 0)
                    response.outputJson = result[0].first;
                resolve(response);
            }
        })
    })
}
module.exports.getCellphone = getCellphone;
//---------------------------------------------------------
function updateCellphone(cellphone, userId) {
    const response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();
    return new Promise((resolve) => {
        const userValidation = new userValidationClass();
        const errorMessages = userValidation.validateUpdateCellphone(cellphone);
        if (errorMessages != null && errorMessages.length !== 0) {
            response.isSuccessful = false;
            response.serverValidations = errorMessages;
            resolve(respone);
        }
        User.findById(userId, { userDetail: 1 })
            .then((userDetailId) => {
                UserDetail.UserDetail.findOneAndUpdate({ _id: userDetailId },
                    { cellphone: cellphone },
                    { upsert: false, returnNewDocument: true }).then((userDetail) => {
                        response.isSuccessful = true;
                        userDetailObj = {
                            studenNumber: userDetail.studentNumber,
                            cellphone: userDetail.cellphone,
                        }
                        response.outputJson = userDetailObj;
                        resolve(response);
                    }).catch(() => {
                        response.isSuccessful = false;
                        let message = global.dbExceptionHandler.tryGetErrorMessage(userFindErr);
                        if (message != null)
                            response.serverValidations.push(message);
                        else
                            response.serverValidations.push(global.errorResource.Err0000());
                        resolve(response);
                    })
            })
            .catch(() => {
                response.isSuccessful = false;
                response.serverValidations.push(global.errorResource.Err0000());
                resolve(response);
            })
    });
}
module.exports.updateCellphone = updateCellphone;
//---------------------------------------------------------
//TODO
//---------------------------------------------------------
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
                                                responseObj = {
                                                    password: hiddenData
                                                }

                                                response.outputJson = responseObj
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
//---------------------------------------------------------
/*TODO:BAD PRACTICE*/
/* WHY SHOULD WE WAIT?! :) */
/* CASUE THE WAY THE PROMISE IS RETURNED! */
async function saveAuthKey4User(userId) {

    let response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();
    response.isSuccessful = false;

    let authKey = mongoose.Types.ObjectId();
    const docQuery = User.findOneAndUpdate({ _id: userId }, { authkKey: authKey });
    await docQuery.exec().then((doc) => {

        response.isSuccessful = true;
        response["hasAuthKey"] = true;
        response.outputJson = { authKey: authKey };
    })
        .catch((err) => {

            response.isSuccessful = false;
            response.serverValidations.push(global.errorResource.Err0000());

        });
    return Promise.resolve(response);
}
module.exports.saveAuthKey4User = saveAuthKey4User;
//--------------------------------------------------------
function getScore(userId) {
    let response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();
    return new Promise((resolve) => {
        if (!userId) {
            response.isSuccessful = false;
            response.serverValidations.push(global.errorResource.Err0005());
            resolve(response)
        }
        getUserJoinedDetail(userId).then((userCompleteObject) => {          
            if (!userCompleteObject ||
                !userCompleteObject.userDetailCollection ||
                !userCompleteObject.userDetailCollection[0] ||
                !userCompleteObject.userDetailCollection[0].skillScore ||
                !userCompleteObject.userDetailCollection[0].skillScore[0]) {
                response.isSuccessful = false;
                response.serverValidations.push(global.errorResource.ErrBu0010());
                resolve(response);
            }
            else {
                response.isSuccessful = true;
                response.outputJson = userCompleteObject.userDetailCollection[0].skillScore[0];
                resolve(response);
            }
        })
            .catch((err) => {
                response.isSuccessful = false;
                response.serverValidations.push(err);
                resolve(response);
            })
    })
}
module.exports.getScore = getScore;
/*---------------------------------*/



/*------------------------ PRIVATE FUNCTIONS--------------*/
function getUserJoinedDetail(userId) {
    return new Promise((resolve, reject) => {
        const aggregate = User.aggregate([{ $match: { _id: mongoose.Types.ObjectId(userId) } },
        { $lookup: { from: 'userdetails', localField: 'userDetail', foreignField: '_id', as: 'userDetailCollection' } }]);
        aggregate.exec((err, result) => {
            if (err) {
                reject(global.errorResource.Err0000());
            }
            else {
                (result && result.length != 0) ?
                    resolve(result[0]) : resolve(null);
            }
        })
    });
}